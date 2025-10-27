# 🚀 Quick Start Guide - AWS Services Monitor

Guía rápida para ejecutar el proyecto en menos de 5 minutos.

## Opción 1: Modo Demo (Sin AWS) - RECOMENDADO

Esta es la forma más rápida de ver el proyecto funcionando con datos mock.

### Frontend (Dashboard Web)

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar
npm run dev
```

Abre http://localhost:3000 en tu navegador.

### Backend (API) - Opcional

```bash
# 1. Instalar Python dependencies
cd backend
pip install -r requirements.txt

# 2. Ejecutar
python main.py
```

API disponible en http://localhost:8000/api/docs

## Opción 2: Docker (Todo incluido)

```bash
# Ejecutar todo con un comando
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs

## Opción 3: Con AWS Real

### 1. Configurar Credenciales

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar .env y agregar tus credenciales AWS
AWS_ACCESS_KEY_ID=tu_access_key_aquí
AWS_SECRET_ACCESS_KEY=tu_secret_key_aquí
AWS_REGION=us-east-1
USE_MOCK_DATA=false
VITE_MOCK_MODE=false
```

### 2. Ejecutar

```bash
# Frontend
npm install && npm run dev

# Backend (en otra terminal)
cd backend
pip install -r requirements.txt
python main.py
```

## Comandos Útiles

```bash
# Linter
npm run lint

# Tests
npm run test

# Tests E2E
npm run test:e2e

# Build producción
npm run build
```

## ¿Problemas?

### Puerto 3000 ocupado?
```bash
# Cambiar puerto en vite.config.ts
server: { port: 3001 }
```

### Error de credenciales AWS?
```bash
# Activar modo mock
export USE_MOCK_DATA=true
export VITE_MOCK_MODE=true
```

### Error instalando dependencias?
```bash
# Limpiar y reinstalar
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Próximos Pasos

1. **Explora el Dashboard** - Navega por las diferentes tabs (EC2, S3, Lambda, etc.)
2. **Revisa la API** - Visita http://localhost:8000/api/docs para ver la documentación interactiva
3. **Lee el README.md** - Documentación completa del proyecto
4. **Ejecuta los tests** - `npm run test:e2e` para ver tests end-to-end
5. **Personaliza** - Agrega tu información en README.md y package.json

## Stack del Proyecto

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: FastAPI (Python 3.11) + boto3
- **Testing**: Playwright (E2E) + Pytest
- **DevOps**: Docker + GitHub Actions
- **Deploy**: GitHub Pages

## Recursos

- 📖 [README Completo](README.md)
- 🔧 [API Docs](http://localhost:8000/api/docs) (cuando el backend esté ejecutándose)
- 🐛 [Reportar Issues](https://github.com/tu-usuario/Proyecto_aws/issues)

---

**¡Listo para impresionar en tu portafolio! 🎉**
