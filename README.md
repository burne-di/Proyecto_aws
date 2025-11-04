# AWS Services Monitor

<div align="center">

![AWS Services Monitor](https://img.shields.io/badge/AWS-Monitor-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)

**Proyecto E2E completo de Data Engineer Fullstack Senior**

[Demo en vivo](https://tu-usuario.github.io/Proyecto_aws) | [Documentación](#-documentación) | [Características](#-características)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Testing](#-testing)
- [Despliegue](#-despliegue)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Documentation](#-api-documentation)
- [Configuración AWS](#-configuración-aws)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Descripción

**AWS Services Monitor** es una aplicación web completa de monitoreo y verificación de servicios AWS en tiempo real. Desarrollada con las tecnologías más demandadas en el mercado para Data Engineer Fullstack Senior, este proyecto demuestra capacidades end-to-end incluyendo:

- Dashboard interactivo para monitoreo de infraestructura AWS
- Backend API robusto con FastAPI
- Integración completa con AWS SDK (boto3)
- Testing E2E con Playwright
- CI/CD automatizado con GitHub Actions
- Despliegue en GitHub Pages

## ✨ Características

### Frontend
- ⚛️ **React 18** con TypeScript para type safety
- 🎨 **TailwindCSS** y **Shadcn/ui** para UI moderna
- 📊 **Recharts** para visualización de datos
- 🔄 **React Query** para gestión de estado asíncrono
- 📱 **Diseño responsive** para móvil, tablet y desktop
- ⚡ **Vite** para desarrollo ultra-rápido

### Backend
- 🚀 **FastAPI** con async/await para alto rendimiento
- 🐍 **Python 3.11** con type hints
- 🔐 **AWS SDK (boto3)** para integración con servicios AWS
- 📝 **Pydantic** para validación de datos
- 🔍 **Logging estructurado** para debugging
- 🧪 **Pytest** para testing unitario

### Servicios AWS Monitoreados
- 💻 **EC2** - Instancias, estados, métricas
- 🗄️ **S3** - Buckets, tamaño, objetos
- ⚡ **Lambda** - Funciones, invocaciones, runtime
- 🗃️ **RDS** - Bases de datos, estado, configuración
- 🔄 **DynamoDB** - Tablas, capacidad, tamaño
- 🐳 **ECS** - Clusters, tareas, servicios
- 📊 **CloudWatch** - Alarmas, métricas
- 💰 **Cost Explorer** - Costos por servicio

### DevOps & Testing
- 🐳 **Docker** y **Docker Compose** para desarrollo local
- 🧪 **Playwright** para tests E2E
- ⚙️ **GitHub Actions** para CI/CD
- 🔒 **CodeQL** para análisis de seguridad
- 📦 **Trivy** para escaneo de vulnerabilidades

---

## 🛠️ Stack Tecnológico

### Frontend
```
- React 18.2
- TypeScript 5.3
- Vite 5.0
- TailwindCSS 3.4
- Shadcn/ui (Radix UI)
- React Query 5.17
- Recharts 2.10
- Zustand 4.5
- Axios 1.6
```

### Backend
```
- Python 3.11
- FastAPI 0.109
- Uvicorn (ASGI server)
- Boto3 (AWS SDK)
- Pydantic 2.5
- pytest 7.4
```

### DevOps & Tools
```
- Docker & Docker Compose
- Playwright 1.41
- GitHub Actions
- ESLint & Prettier
- Nginx
```

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  React + TypeScript + Vite                          │   │
│  │  ├── Components (UI Shadcn/ui)                      │   │
│  │  ├── Services (API Layer)                           │   │
│  │  ├── State Management (React Query + Zustand)      │   │
│  │  └── Charts (Recharts)                              │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                         BACKEND                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  FastAPI + Python 3.11                              │   │
│  │  ├── Endpoints (REST API)                           │   │
│  │  ├── Models (Pydantic)                              │   │
│  │  ├── Services (Business Logic)                      │   │
│  │  └── AWS Integration (boto3)                        │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ AWS SDK
                         │
┌────────────────────────▼────────────────────────────────────┐
│                        AWS SERVICES                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  EC2 │ S3 │ Lambda │ RDS │ DynamoDB │ ECS │ ...    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js 20+ y npm
- Python 3.11+
- Docker y Docker Compose (opcional)
- Cuenta AWS con credenciales configuradas (opcional para datos reales)

### Opción 1: Instalación Local

#### Frontend

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Ejecutar en modo desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:3000
```

#### Backend

```bash
# Navegar al directorio backend
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor
python main.py

# La API estará disponible en http://localhost:8000
# Documentación en http://localhost:8000/api/docs
```

### Opción 2: Docker Compose

```bash
# Copiar variables de entorno
cp .env.example .env

# Construir y ejecutar contenedores
docker-compose up --build

# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/api/docs
```

---

## 💻 Uso

### Desarrollo

```bash
# Frontend - Modo desarrollo
npm run dev

# Backend - Modo desarrollo
cd backend && python main.py

# Docker Compose - Todos los servicios
docker-compose up
```

### Build de Producción

```bash
# Frontend
npm run build

# Preview del build
npm run preview

# Backend (usando gunicorn o uvicorn)
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Comandos Útiles

```bash
# Linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check

# Tests unitarios frontend
npm run test

# Tests E2E
npm run test:e2e

# Tests backend
cd backend && pytest
```

---

## 🧪 Testing

### Tests Frontend (Vitest)

```bash
npm run test
```

### Tests E2E (Playwright)

```bash
# Instalar browsers
npx playwright install

# Ejecutar tests E2E
npm run test:e2e

# Modo UI
npx playwright test --ui

# Modo debug
npx playwright test --debug
```

### Tests Backend (Pytest)

```bash
cd backend

# Ejecutar todos los tests
pytest

# Con coverage
pytest --cov=app --cov-report=html

# Tests específicos
pytest tests/test_api.py -v
```

---

## 🌐 Despliegue

### GitHub Pages (Frontend) - ⭐ RECOMENDADO

El proyecto está **100% configurado** para desplegar en GitHub Pages con un solo comando:

#### Paso 1: Generar Build para GitHub Pages

```bash
npm run build:docs
```

Este comando genera el build optimizado en la carpeta `docs/` que GitHub Pages puede servir directamente.

#### Paso 2: Commit y Push

```bash
git add .
git commit -m "feat: Deploy to GitHub Pages"
git push origin main
```

#### Paso 3: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. **Source**:
   - Branch: `main`
   - Folder: `/docs`
4. **Save**

¡Listo! Tu sitio estará en: `https://tu-usuario.github.io/Proyecto_aws/`

**URLs disponibles:**
- **Presentación**: `https://tu-usuario.github.io/Proyecto_aws/` (Landing page profesional)
- **Dashboard**: `https://tu-usuario.github.io/Proyecto_aws/dashboard` (Monitor AWS)

📖 **Guía detallada**: Ver [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md)

#### Actualizaciones Automáticas (Opcional)

El proyecto incluye un workflow de GitHub Actions que actualiza automáticamente el build en cada push a `main`. Para activarlo, habilita permisos de escritura en Settings → Actions → General → "Read and write permissions".

### Backend (Opciones)

#### AWS EC2/ECS
```bash
# Usar Dockerfile.backend
docker build -f Dockerfile.backend -t aws-monitor-backend .
docker run -p 8000:8000 -e AWS_REGION=us-east-1 aws-monitor-backend
```

#### AWS Lambda + API Gateway
```bash
# Usar Mangum para adaptador ASGI
pip install mangum
# Configurar handler para Lambda
```

#### Docker Hub
```bash
docker build -f Dockerfile.backend -t tu-usuario/aws-monitor-backend .
docker push tu-usuario/aws-monitor-backend
```

---

## 📁 Estructura del Proyecto

```
Proyecto_aws/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Pipeline CI/CD
│       ├── deploy-gh-pages.yml       # Despliegue GitHub Pages
│       └── codeql.yml                # Análisis de seguridad
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py                 # Modelos Pydantic
│   │   └── services.py               # Lógica AWS SDK
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_api.py               # Tests API
│   ├── main.py                       # FastAPI app
│   ├── requirements.txt              # Dependencias Python
│   └── pytest.ini                    # Configuración pytest
├── src/
│   ├── components/
│   │   ├── ui/                       # Componentes Shadcn/ui
│   │   ├── Dashboard.tsx             # Dashboard principal
│   │   ├── ServicesOverview.tsx      # Overview servicios
│   │   ├── EC2Dashboard.tsx          # Dashboard EC2
│   │   ├── S3Dashboard.tsx           # Dashboard S3
│   │   ├── LambdaDashboard.tsx       # Dashboard Lambda
│   │   ├── DatabaseDashboard.tsx     # Dashboard Databases
│   │   └── CostDashboard.tsx         # Dashboard Costos
│   ├── services/
│   │   └── api.ts                    # Cliente API
│   ├── types/
│   │   └── aws.ts                    # Tipos TypeScript
│   ├── lib/
│   │   └── utils.ts                  # Utilidades
│   ├── App.tsx                       # Componente raíz
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Estilos globales
├── tests/
│   └── e2e/
│       └── dashboard.spec.ts         # Tests E2E Playwright
├── Dockerfile.backend                # Dockerfile backend
├── Dockerfile.frontend               # Dockerfile frontend
├── docker-compose.yml                # Orquestación Docker
├── nginx.conf                        # Configuración Nginx
├── package.json                      # Dependencias Node
├── tsconfig.json                     # Configuración TypeScript
├── vite.config.ts                    # Configuración Vite
├── tailwind.config.js                # Configuración Tailwind
├── playwright.config.ts              # Configuración Playwright
├── .env.example                      # Variables de entorno ejemplo
├── .gitignore                        # Git ignore
└── README.md                         # Este archivo
```

---

## 📚 API Documentation

La documentación interactiva de la API está disponible en:

- **Swagger UI**: `http://localhost:8000/api/docs`
- **ReDoc**: `http://localhost:8000/api/redoc`

### Endpoints Principales

```
GET  /                          # Root endpoint
GET  /api/health                # Health check
GET  /api/services              # Listar todos los servicios
GET  /api/services/{id}/health  # Health check servicio específico
GET  /api/ec2/instances         # Listar instancias EC2
GET  /api/s3/buckets            # Listar buckets S3
GET  /api/lambda/functions      # Listar funciones Lambda
GET  /api/rds/instances         # Listar instancias RDS
GET  /api/dynamodb/tables       # Listar tablas DynamoDB
GET  /api/ecs/clusters          # Listar clusters ECS
GET  /api/cloudwatch/alarms     # Listar alarmas CloudWatch
GET  /api/costs                 # Datos de costos
```

---

## ⚙️ Configuración AWS

### Credenciales AWS

Para usar datos reales de AWS, configura tus credenciales:

**Opción 1: Variables de entorno**

```bash
export AWS_ACCESS_KEY_ID=tu_access_key
export AWS_SECRET_ACCESS_KEY=tu_secret_key
export AWS_REGION=us-east-1
export USE_MOCK_DATA=false
```

**Opción 2: Archivo .env**

```bash
AWS_ACCESS_KEY_ID=tu_access_key
AWS_SECRET_ACCESS_KEY=tu_secret_key
AWS_REGION=us-east-1
USE_MOCK_DATA=false
```

**Opción 3: AWS CLI**

```bash
aws configure
```

### Permisos IAM Requeridos

El usuario IAM necesita los siguientes permisos (solo lectura):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:Describe*",
        "s3:List*",
        "s3:GetBucket*",
        "lambda:List*",
        "lambda:Get*",
        "rds:Describe*",
        "dynamodb:List*",
        "dynamodb:Describe*",
        "ecs:List*",
        "ecs:Describe*",
        "cloudwatch:Describe*",
        "cloudwatch:List*",
        "cloudwatch:GetMetricStatistics",
        "ce:GetCostAndUsage"
      ],
      "Resource": "*"
    }
  ]
}
```

### Modo Mock

Por defecto, la aplicación usa datos mock para facilitar el testing y demo:

```bash
USE_MOCK_DATA=true
VITE_MOCK_MODE=true
```

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código

- **Frontend**: ESLint + Prettier configurados
- **Backend**: PEP 8 con type hints
- **Commits**: Conventional Commits
- **Tests**: Requeridos para nuevas funcionalidades

---

## 📈 Roadmap

- [ ] Implementar autenticación con AWS Cognito
- [ ] Agregar más servicios AWS (CloudFront, Route53, etc.)
- [ ] Dashboard personalizable con drag-and-drop
- [ ] Alertas en tiempo real con WebSockets
- [ ] Exportación de reportes (PDF, Excel)
- [ ] Multi-región support
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)

---

## 🐛 Troubleshooting

### Error: "AWS credentials not found"

**Solución**: Configura tus credenciales AWS o activa el modo mock:
```bash
export USE_MOCK_DATA=true
```

### Error: "Port 3000 already in use"

**Solución**: Cambia el puerto en `vite.config.ts`:
```typescript
server: {
  port: 3001
}
```

### Error al instalar dependencias

**Solución**: Limpia cache y reinstala:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Tu Nombre**
📧 Email: rubendqv@gmail.com
💼 LinkedIn: linkedin.com/in/rubenquispev/
🐙 GitHub: github.com/burne-di

---

## 🙏 Agradecimientos

- [FastAPI](https://fastapi.tiangolo.com/)
- [React](https://react.dev/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [AWS](https://aws.amazon.com/)
- [Playwright](https://playwright.dev/)

---

<div align="center">

**⭐ Si este proyecto te fue útil, considera darle una estrella ⭐**

Desarrollado con ❤️ por un Data Engineer Fullstack Senior

</div>
