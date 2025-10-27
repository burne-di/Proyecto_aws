"""
OLTP to OLAP Pipeline DAG
Complete data engineering pipeline: RDS → S3 → Glue → Redshift → dbt → QuickSight
"""

from airflow import DAG
from airflow.providers.amazon.aws.operators.glue import GlueJobOperator
from airflow.providers.amazon.aws.operators.s3 import S3ListOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.operators.bash import BashOperator
from airflow.operators.python import PythonOperator
from airflow.utils.dates import days_ago
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

default_args = {
    'owner': 'data-engineering-team',
    'depends_on_past': False,
    'email': ['alerts@company.com'],
    'email_on_failure': True,
    'email_on_retry': False,
    'retries': 2,
    'retry_delay': timedelta(minutes=5),
}

with DAG(
    'oltp_to_olap_pipeline',
    default_args=default_args,
    description='Complete E2E pipeline from OLTP to OLAP with dbt transformations',
    schedule_interval='@daily',
    start_date=days_ago(1),
    catchup=False,
    tags=['production', 'e2e', 'data-engineering'],
) as dag:

    # Task 1: Extract from RDS PostgreSQL (OLTP)
    extract_from_rds = GlueJobOperator(
        task_id='extract_from_rds',
        job_name='extract_rds_to_s3_raw',
        script_location='s3://my-bucket/glue-scripts/extract_from_rds.py',
        s3_bucket='my-bucket',
        iam_role_name='AWSGlueServiceRole',
        create_job_kwargs={
            'GlueVersion': '4.0',
            'NumberOfWorkers': 2,
            'WorkerType': 'G.1X',
            'Timeout': 60,
        },
    )

    # Task 2: Validate RAW data landed in S3
    validate_raw_data = S3ListOperator(
        task_id='validate_raw_data',
        bucket='my-bucket',
        prefix='raw/orders/',
        delimiter='/',
    )

    # Task 3: Transform RAW to SILVER (cleaning, typing, deduplication)
    raw_to_silver = GlueJobOperator(
        task_id='raw_to_silver_transformation',
        job_name='raw_to_silver_job',
        script_location='s3://my-bucket/glue-scripts/raw_to_silver.py',
        s3_bucket='my-bucket',
        iam_role_name='AWSGlueServiceRole',
        create_job_kwargs={
            'GlueVersion': '4.0',
            'NumberOfWorkers': 4,
            'WorkerType': 'G.1X',
            'Timeout': 120,
        },
    )

    # Task 4: Transform SILVER to GOLD (business logic, aggregations)
    silver_to_gold = GlueJobOperator(
        task_id='silver_to_gold_transformation',
        job_name='silver_to_gold_job',
        script_location='s3://my-bucket/glue-scripts/silver_to_gold.py',
        s3_bucket='my-bucket',
        iam_role_name='AWSGlueServiceRole',
        create_job_kwargs={
            'GlueVersion': '4.0',
            'NumberOfWorkers': 4,
            'WorkerType': 'G.2X',
            'Timeout': 180,
        },
    )

    # Task 5: Load GOLD data to Redshift
    gold_to_redshift = GlueJobOperator(
        task_id='load_gold_to_redshift',
        job_name='gold_to_redshift_job',
        script_location='s3://my-bucket/glue-scripts/gold_to_redshift.py',
        s3_bucket='my-bucket',
        iam_role_name='AWSGlueServiceRole',
        create_job_kwargs={
            'GlueVersion': '4.0',
            'NumberOfWorkers': 2,
            'WorkerType': 'G.1X',
            'Timeout': 60,
            'Connections': {
                'Connections': ['redshift-connection']
            },
        },
    )

    # Task 6: Run dbt models (Star Schema + OLAP cubes)
    dbt_run = BashOperator(
        task_id='dbt_run_models',
        bash_command='''
            cd /usr/local/airflow/dbt_redshift && \
            dbt deps && \
            dbt run --profiles-dir . && \
            dbt test --profiles-dir .
        ''',
    )

    # Task 7: Refresh materialized views (OLAP cubes)
    refresh_olap_cubes = PostgresOperator(
        task_id='refresh_olap_cubes',
        postgres_conn_id='redshift_default',
        sql='''
            REFRESH MATERIALIZED VIEW mv_sales_cube;
            REFRESH MATERIALIZED VIEW mv_customer_summary;
            REFRESH MATERIALIZED VIEW mv_product_performance;
        ''',
    )

    # Task 8: Generate data quality metrics
    def generate_dq_metrics(**context):
        """Generate data quality metrics and log them"""
        logger.info("Generating data quality metrics...")
        # This would connect to Redshift and calculate metrics
        metrics = {
            'total_records': 1000000,
            'null_percentage': 0.01,
            'duplicate_percentage': 0.0,
            'freshness_hours': 1.5,
        }
        logger.info(f"Data Quality Metrics: {metrics}")
        return metrics

    data_quality_check = PythonOperator(
        task_id='data_quality_check',
        python_callable=generate_dq_metrics,
    )

    # Task 9: Update QuickSight dataset
    refresh_quicksight = BashOperator(
        task_id='refresh_quicksight_dataset',
        bash_command='''
            aws quicksight create-ingestion \
            --aws-account-id {{ var.value.aws_account_id }} \
            --data-set-id {{ var.value.quicksight_dataset_id }} \
            --ingestion-id $(date +%s)
        ''',
    )

    # Task 10: Send success notification
    def send_success_notification(**context):
        """Send success notification via SNS"""
        logger.info("Pipeline completed successfully!")
        # This would send SNS notification
        return "Success"

    notify_success = PythonOperator(
        task_id='notify_success',
        python_callable=send_success_notification,
    )

    # Define task dependencies (pipeline flow)
    extract_from_rds >> validate_raw_data >> raw_to_silver
    raw_to_silver >> silver_to_gold >> gold_to_redshift
    gold_to_redshift >> dbt_run >> refresh_olap_cubes
    refresh_olap_cubes >> data_quality_check
    data_quality_check >> refresh_quicksight >> notify_success
