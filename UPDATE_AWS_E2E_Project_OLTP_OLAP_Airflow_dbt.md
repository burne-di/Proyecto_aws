# 🔄 Actualización del Proyecto E2E de Data Engineering en AWS (OLTP + OLAP + Airflow + dbt)

> **Objetivo:** Ampliar el proyecto E2E existente para incluir un **flujo completo desde OLTP → Data Lake → OLAP**, orquestado por **Airflow (MWAA)** e integrado con **dbt** sobre **Redshift**.  
> Este documento describe paso a paso cómo actualizar tu repositorio para reflejar un flujo realista y escalable de Data Engineering Senior.

---

## 🧩 1. Resumen de la nueva arquitectura

**Flujo general:**

```
OLTP (RDS PostgreSQL)
   ↓
AWS DMS / Lambda
   ↓
S3 (RAW → SILVER → GOLD)
   ↓
Glue (PySpark)
   ↓
Airflow (MWAA)
   ↓
Redshift (OLAP)
   ↓
dbt (Modelado analítico)
   ↓
QuickSight (Dashboards / Cubos OLAP)
```

**Objetivos técnicos de la actualización:**
- Agregar **fuente OLTP (RDS PostgreSQL)** como origen.
- Implementar **sincronización con DMS o Lambda** hacia S3 (RAW).
- Crear **cubos OLAP en Redshift** modelados con **dbt (Star Schema)**.
- Integrar **Airflow (MWAA)** para ejecutar ETL + dbt + validaciones.
- Configurar **QuickSight** para consumo final.
- Asegurar **gobernanza, seguridad y performance**.

---

## ⚙️ 2. Estructura de carpetas (extendida)

```
aws-e2e-data-engineering/
├─ airflow_dags/
│  ├─ dags/
│  │  ├─ batch_pipeline.py
│  │  ├─ dbt_pipeline.py
│  │  └─ olap_cube_refresh.py        ← nuevo DAG
│  └─ plugins/operators/
│     ├─ dbt_operator.py
│     └─ glue_operator.py
│
├─ dbt_redshift/
│  ├─ models/
│  │  ├─ staging/
│  │  │  └─ stg_orders.sql
│  │  ├─ marts/
│  │  │  ├─ dim_customer.sql
│  │  │  ├─ dim_date.sql
│  │  │  └─ fct_sales.sql
│  │  ├─ cubes/
│  │  │  ├─ cube_sales_summary.sql   ← nuevo modelo de cubo OLAP
│  │  └─ schema.yml
│  └─ dbt_project.yml
│
├─ glue_jobs/
│  ├─ raw_to_silver/job.py
│  ├─ silver_to_gold/job.py
│  └─ gold_to_redshift/job.py        ← nuevo
│
├─ scripts/
│  ├─ setup_rds_source.sql
│  ├─ start_dms_task.sh
│  └─ refresh_quicksight_dataset.sh  ← nuevo
│
└─ docs/
   ├─ diagrams/oltp_olap_flow.mmd
   ├─ airflow_dbt_sequence.png
   └─ cube_layer_design.md
```

---

## 🧱 3. Configuración OLTP → S3 (RAW)

### 3.1 Crear base OLTP (PostgreSQL en RDS)
```sql
CREATE TABLE public.orders (
  order_id SERIAL PRIMARY KEY,
  customer_id INT,
  order_date TIMESTAMP,
  amount NUMERIC(10,2)
);
CREATE TABLE public.customers (
  customer_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  region VARCHAR(50)
);
INSERT INTO customers (name, region) VALUES ('Ana', 'Lima'), ('Luis', 'Cusco');
INSERT INTO orders (customer_id, order_date, amount) VALUES (1, NOW(), 300.50);
```

### 3.2 Replicar hacia S3
Opciones:
- **AWS DMS:** crea una tarea “RDS → S3 (Parquet)”.  
- **Lambda + boto3:** exporta transacciones recientes.

Script ejemplo:
```python
import boto3, json, psycopg2
s3 = boto3.client('s3')
conn = psycopg2.connect(host='...', dbname='oltp_db', user='admin', password='...')
cur = conn.cursor()
cur.execute("SELECT * FROM orders WHERE order_date > NOW() - interval '1 day'")
rows = [dict(zip([d[0] for d in cur.description], r)) for r in cur.fetchall()]
s3.put_object(Bucket='my-bucket', Key='raw/orders/orders.json', Body=json.dumps(rows))
```

---

## 🧠 4. Airflow (MWAA) — DAG extendido

**Nuevo DAG: `oltp_to_olap_pipeline.py`**

```python
from airflow import DAG
from airflow.providers.amazon.aws.operators.glue import AwsGlueJobOperator
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG('oltp_to_olap_pipeline',
         start_date=datetime(2025,1,1),
         schedule='@daily',
         catchup=False) as dag:

    extract = AwsGlueJobOperator(
        task_id='extract_from_rds',
        job_name='extract_from_rds_job'
    )

    transform = AwsGlueJobOperator(
        task_id='raw_to_silver',
        job_name='raw_to_silver_job'
    )

    gold_transform = AwsGlueJobOperator(
        task_id='silver_to_gold',
        job_name='silver_to_gold_job'
    )

    dbt_run = BashOperator(
        task_id='dbt_run',
        bash_command='cd /dbt_redshift && dbt run && dbt test'
    )

    extract >> transform >> gold_transform >> dbt_run
```

---

## 📊 5. dbt (Redshift) — Modelo estrella y cubos OLAP

### 5.1 Ejemplo de modelo de hecho
`models/marts/fct_sales.sql`
```sql
SELECT
  o.order_id,
  o.customer_id,
  c.region,
  o.order_date,
  o.amount
FROM {{ ref('stg_orders') }} o
JOIN {{ ref('dim_customer') }} c USING (customer_id);
```

### 5.2 Cubo OLAP
`models/cubes/cube_sales_summary.sql`
```sql
SELECT
  region,
  DATE_TRUNC('month', order_date) AS month,
  SUM(amount) AS total_sales,
  COUNT(DISTINCT order_id) AS num_orders
FROM {{ ref('fct_sales') }}
GROUP BY region, DATE_TRUNC('month', order_date);
```

### 5.3 Tests
`schema.yml`
```yaml
models:
  - name: fct_sales
    tests:
      - unique:
          column_name: order_id
      - not_null:
          column_name: customer_id
  - name: dim_customer
    tests:
      - relationships:
          to: ref('fct_sales')
          field: customer_id
```

---

## 🔄 6. Automatización con Airflow + dbt

Airflow ejecutará:
1. `extract_from_rds` (Glue job o Lambda).
2. `raw_to_silver` (limpieza y tipado).  
3. `silver_to_gold` (join con dimensiones).  
4. `dbt_run` (modelo analítico + test).  
5. `publish_to_quicksight` (opcional script bash).

---

## 🧩 7. Cubos OLAP (Redshift + QuickSight)

### 7.1 Crear vista materializada
```sql
CREATE MATERIALIZED VIEW mv_sales_cube AS
SELECT region, DATE_TRUNC('month', order_date) AS month, SUM(amount) AS total_sales
FROM fct_sales
GROUP BY region, DATE_TRUNC('month', order_date);
```

### 7.2 Conectar QuickSight
1. Crear dataset desde Redshift.  
2. Seleccionar `mv_sales_cube`.  
3. Configurar refresco diario.  
4. Crear dashboard interactivo (filtros por región, mes, cliente).

---

## 🧠 8. Buenas prácticas para OLTP + OLAP

| Categoría | Práctica | Descripción |
|------------|-----------|--------------|
| **OLTP** | Usa PK/FK consistentes | Evita duplicados y mantiene integridad |
| **Data Lake** | Particiona por fecha | Mejora rendimiento Glue/Athena |
| **Glue** | Usa Parquet + compresión snappy | Reduce tamaño y acelera queries |
| **Airflow** | DAGs modulares y idempotentes | Evita cargas duplicadas |
| **dbt** | Testea y documenta modelos | Usa `dbt test` + `dbt docs` |
| **OLAP** | Crea vistas materializadas | Mejora tiempo de respuesta BI |
| **Seguridad** | IAM + Lake Formation | Control granular de acceso |

---

## 🧭 9. Validación y pruebas

### 9.1 Smoke tests
- Verificar que RDS → S3 (RAW) genera archivos `.parquet` válidos.
- Glue jobs completan con `state: SUCCEEDED`.
- Airflow DAG ejecuta `dbt_run` sin errores.
- dbt tests: todos **PASS**.

### 9.2 Monitoreo
- **CloudWatch Logs:** para Glue, MWAA, Lambda.  
- **SNS Alerts:** notificaciones en fallos de DAG.  
- **Lineage:** dbt docs + OpenLineage opcional.

---

## 🧱 10. Resultado esperado

- Data Lake (`S3://project/raw|silver|gold`) actualizado diariamente.  
- Modelo estrella completo (`dim_customer`, `fct_sales`).  
- Cubo OLAP materializado en Redshift (`mv_sales_cube`).  
- Dashboards conectados en QuickSight.  
- Airflow DAG estable y monitoreado.  
- dbt tests y documentación generados automáticamente.

---

## ✅ Próximos pasos
- Agregar **CDC con DMS**.  
- Implementar **CI/CD (GitHub Actions)**.  
- Integrar **Great Expectations**.  
- Expandir con **streaming (Kinesis)**.  
- Migrar a **Databricks o Lakehouse** opcionalmente.

---
**Autor:** Equipo Data Engineering  
**Versión:** 2025.10  
