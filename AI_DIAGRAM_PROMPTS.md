# 🎨 Prompts para Generar Diagrama de Arquitectura con IA

## 📋 Información del Proyecto

**Proyecto**: AWS E2E Data Engineering Platform - OLTP to OLAP Pipeline

---

## 🎯 Opción 1: Prompt para DALL-E / Midjourney / Stable Diffusion

### Prompt Principal (Copiar y Pegar):

```
Create a professional, modern data architecture diagram for an AWS End-to-End Data Engineering Platform. The diagram should show:

LAYER 1 - Data Sources (Top):
- Three database icons labeled "PostgreSQL (Orders)", "MySQL (Customers)", "API (Products)"
- Blue color scheme
- Connected with arrows flowing downward

LAYER 2 - Change Data Capture:
- AWS DMS service icon in the center
- Green color scheme
- Label: "AWS DMS - Change Data Capture (CDC)"
- Arrows flowing from databases above to DMS

LAYER 3 - Data Lake (S3):
- Three storage containers showing medallion architecture:
  * "RAW" layer (Yellow/Gold) - Parquet files
  * "SILVER" layer (Cyan/Blue) - Cleaned data
  * "GOLD" layer (Purple) - Aggregated data
- Horizontal arrows showing progression: RAW → SILVER → GOLD
- All contained within an S3 bucket icon

LAYER 4 - Processing:
- Two service boxes side by side:
  * "AWS Glue" (Orange) - PySpark ETL Jobs
  * "Apache Airflow (MWAA)" (Teal) - Workflow Orchestration
- Arrows flowing from GOLD layer to these services

LAYER 5 - Data Warehouse:
- Large "Amazon Redshift" service box (Red)
- Inside showing three components:
  * "Staging Tables"
  * "Star Schema (dbt)"
  * "OLAP Cubes"
- dbt logo or mention
- Arrows flowing from processing layer

LAYER 6 - Business Intelligence (Bottom):
- "AWS QuickSight" service box (Indigo/Purple)
- Dashboard/chart icons
- Arrows from Redshift to QuickSight

STYLE REQUIREMENTS:
- Modern, professional design
- AWS service official colors and icons
- Clean, minimalist aesthetic
- Dark background (slate/navy blue)
- Glowing neon effects on arrows
- Isometric or flat design style
- Tech/futuristic look
- High contrast, readable text
- 16:9 aspect ratio (landscape)
- Professional presentation quality

TECHNICAL DETAILS TO INCLUDE:
- Service names clearly visible
- Data flow arrows animated-looking (glowing)
- Layer numbers (1-6) on the left side
- Technologies labeled: dbt, PySpark, Parquet
- "1M+ daily records" metric somewhere visible

The overall look should be suitable for a senior data engineer portfolio, showing enterprise-level architecture expertise.
```

### Variaciones del Prompt:

#### Variación A - Más Minimalista:
```
Modern AWS data pipeline architecture diagram, dark theme, showing: PostgreSQL/MySQL → AWS DMS → S3 (RAW/SILVER/GOLD layers) → AWS Glue + Airflow → Redshift → QuickSight. Clean lines, neon blue arrows, professional tech aesthetic, isometric view, dark navy background.
```

#### Variación B - Más Detallado:
```
Highly detailed AWS data engineering architecture infographic. Six distinct layers: 1) OLTP sources (PostgreSQL, MySQL, APIs) with database icons, 2) AWS DMS for CDC with bidirectional sync icons, 3) S3 Data Lake with three medallion zones (RAW in gold, SILVER in cyan, GOLD in purple), 4) Processing layer with AWS Glue spark clusters and Airflow DAGs, 5) Redshift warehouse showing dimensional model with dbt transformations, 6) QuickSight dashboards with chart previews. Dark background, glowing connections, AWS official branding, enterprise architecture poster style, 4K quality, volumetric lighting on services.
```

---

## 🎯 Opción 2: Prompt para Leonardo.AI (Mejor para Diagramas Técnicos)

### Preset Recomendado: **Leonardo Diffusion XL** o **Leonardo Phoenix**

```
Technical architecture diagram, AWS data pipeline, professional infographic style.

COMPOSITION:
Vertical flow diagram with 6 layers, dark blue-gray background (#1a202c).

TOP TO BOTTOM:
1. Data Sources row: Three rounded rectangles with database icons - "PostgreSQL Orders", "MySQL Customers", "API Products". Blue gradient (#3b82f6 to #1e40af).

2. Single center box: "AWS DMS CDC" with data sync icon. Green gradient (#10b981 to #059669).

3. S3 medallion architecture: Three connected containers:
   - "RAW Layer" (yellow #fbbf24)
   - "SILVER Layer" (cyan #06b6d4)
   - "GOLD Layer" (purple #a855f7)
   Right arrows between them.

4. Two side-by-side boxes:
   - "AWS Glue PySpark" (orange #f97316)
   - "Airflow MWAA" (teal #14b8a6)

5. Large center box: "Amazon Redshift DWH" (red #ef4444)
   Contains three mini-boxes: "Staging", "Star Schema dbt", "OLAP Cubes"

6. Bottom box: "AWS QuickSight BI" (indigo #6366f1) with dashboard icon.

STYLE:
- Glassmorphism effect on boxes
- Glowing neon arrows (#00ff00) connecting layers
- Drop shadows on all elements
- Service icons from AWS official set
- Sans-serif font (Inter or Roboto)
- Layer labels on left margin
- 1920x1080 resolution
- Professional SaaS product style

QUALITY: High detail, sharp edges, production-ready, portfolio quality
```

---

## 🎯 Opción 3: Prompt para Claude (Artifacts) - Genera SVG Directamente

Si usas Claude con Artifacts habilitado:

```
Create an SVG diagram showing an AWS E2E data engineering pipeline.

Requirements:
- 6 horizontal layers stacked vertically
- Color-coded boxes for each AWS service
- Animated arrows showing data flow (use CSS animations)
- Dark theme background
- Responsive viewBox
- Professional appearance

Layers:
1. Top: PostgreSQL, MySQL, APIs (blue boxes)
2. AWS DMS (green box)
3. S3 with RAW/SILVER/GOLD sections (yellow/cyan/purple)
4. AWS Glue + Airflow (orange/teal boxes)
5. Redshift with internal sections (red box)
6. QuickSight (indigo box)

Add glowing effects on arrows using SVG filters.
Include service icons as simple shapes.
Make it 1200x800px.
```

---

## 🎯 Opción 4: Herramientas Especializadas (No-Code)

Si prefieres usar herramientas de diagramas:

### A) **Excalidraw** (Gratuito, Open Source)
- URL: https://excalidraw.com
- Estilo: Hand-drawn, informal pero profesional
- Exporta a SVG/PNG de alta calidad

**Instrucciones**:
1. Ir a excalidraw.com
2. Dibujar 6 capas rectangulares
3. Agregar iconos de https://iconduck.com/sets/aws-icons
4. Conectar con flechas
5. Exportar como PNG (2x resolution)

### B) **draw.io / diagrams.net** (Gratuito)
- URL: https://app.diagrams.net
- Tiene biblioteca oficial de iconos AWS
- Exporta a PNG/SVG de alta calidad

**Instrucciones**:
1. Ir a app.diagrams.net
2. File → New → Blank Diagram
3. More Shapes → Buscar "AWS 19"
4. Arrastrar iconos AWS oficiales
5. Organizar en 6 capas
6. File → Export as → PNG (300 DPI)

### C) **Lucidchart** (Freemium)
- URL: https://www.lucidchart.com
- Templates profesionales de AWS
- Mejor para presentaciones corporativas

---

## 🎯 Opción 5: Prompt para ChatGPT + DALL-E 3

```
I need a professional architecture diagram for my data engineering portfolio. Create a clean, modern visualization of an AWS data pipeline:

Visual Style: Dark theme, tech startup aesthetic, glowing elements

Content:
Row 1: Three source databases (PostgreSQL, MySQL, API) with blue glow
Row 2: AWS DMS service for change data capture (green)
Row 3: S3 Data Lake showing three zones - RAW (yellow), SILVER (cyan), GOLD (purple) in sequence
Row 4: AWS Glue (orange) and Apache Airflow (teal) processing services
Row 5: Amazon Redshift warehouse (red) with internal Star Schema and OLAP Cubes labels
Row 6: AWS QuickSight dashboards (indigo)

Connect all rows with glowing animated-style arrows flowing downward.
Add labels for each service and technology (dbt, PySpark, Parquet).
Professional, portfolio-quality, suitable for LinkedIn.
Landscape orientation, high resolution.
```

---

## 📐 Especificaciones Técnicas para el Diagrama

### Dimensiones Recomendadas:
- **LinkedIn Post**: 1200x627px (1.91:1)
- **Portfolio Website**: 1920x1080px (16:9)
- **Presentación**: 2560x1440px (16:9, 4K-ready)
- **GitHub README**: 1280x720px (16:9)

### Colores Oficiales AWS:
```
AWS Orange: #FF9900
Redshift: #E84855
S3: #569A31
Glue: #C925D1
Lambda: #FF9900
DMS: #527FFF
QuickSight: #2E27AD
```

### Paleta Alternativa (Más Moderna):
```
Background: #0f172a (slate-900)
Primary: #3b82f6 (blue-500)
Secondary: #8b5cf6 (violet-500)
Accent: #06b6d4 (cyan-500)
Success: #10b981 (emerald-500)
Warning: #f59e0b (amber-500)
Danger: #ef4444 (red-500)
```

---

## 🚀 Después de Generar el Diagrama

### Dónde Guardar:
```
Proyecto_aws/
├── public/
│   └── architecture-diagram.png  ← Aquí
└── docs/
    └── images/
        └── architecture.png  ← O aquí
```

### Cómo Agregarlo a la Presentación:

**Opción A - Reemplazar el diagrama CSS actual**:

Editar `src/pages/ProjectPresentation.tsx`, buscar la sección del diagrama y reemplazar con:

```tsx
<div className="relative">
  <img
    src="/Proyecto_aws/architecture-diagram.png"
    alt="AWS E2E Data Engineering Architecture"
    className="w-full rounded-xl border border-white/10 shadow-2xl"
  />
  <p className="text-center text-sm text-gray-400 mt-4">
    End-to-end data flow: OLTP → Data Lake → OLAP → BI
  </p>
</div>
```

**Opción B - Agregar como sección adicional**:

Agregar después del diagrama actual como una "High-Level Overview"

---

## 💡 Recomendación

**Para tu portfolio, te recomiendo**:

1. **Rápido y Profesional**: Usa **draw.io** con iconos oficiales AWS (30 min)
2. **Más Creativo**: Usa **DALL-E 3** con el prompt detallado (5 min + iteraciones)
3. **Máximo Control**: Usa **Excalidraw** y dibuja tú mismo (1 hora)
4. **Más Realista**: Usa **Leonardo.AI** con preset "Leonardo Phoenix" (10 min)

**Mi TOP 3**:
1. 🥇 **Leonardo.AI** (mejor calidad técnica)
2. 🥈 **draw.io** (más rápido, iconos oficiales)
3. 🥉 **DALL-E 3** (buen balance calidad/tiempo)

---

## 📝 Checklist Post-Generación

- [ ] Diagrama generado con IA o herramienta
- [ ] Exportado en alta resolución (mínimo 1920x1080)
- [ ] Formato PNG o SVG
- [ ] Guardado en `public/architecture-diagram.png`
- [ ] Agregado a ProjectPresentation.tsx
- [ ] Build regenerado: `npm run build:docs`
- [ ] Verificado localmente: `npm run preview`
- [ ] Commit y push

---

<div align="center">

## 🎨 ¿Cuál Herramienta Usar?

| Herramienta | Tiempo | Calidad | Personalización | Gratis |
|-------------|--------|---------|-----------------|--------|
| **Leonardo.AI** | 10 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ (150/día) |
| **DALL-E 3** | 5 min | ⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ (ChatGPT Plus) |
| **draw.io** | 30 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| **Excalidraw** | 60 min | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| **Midjourney** | 10 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ❌ ($10/mes) |

**Mejor relación calidad/tiempo**: **Leonardo.AI** o **draw.io**

</div>
