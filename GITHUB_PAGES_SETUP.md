# 🚀 Guía de Configuración de GitHub Pages

## 📋 Pasos para Desplegar

### 1️⃣ Preparar el Build para GitHub Pages

```bash
# Instalar dependencias (si aún no lo hiciste)
npm install

# Generar el build optimizado en la carpeta docs/
npm run build:docs
```

Este comando:
- ✅ Compila TypeScript
- ✅ Genera el build de producción en `docs/`
- ✅ Crea el archivo `.nojekyll`
- ✅ Crea `404.html` para enrutamiento SPA
- ✅ Optimiza chunks de código

### 2️⃣ Commit y Push al Repositorio

```bash
# Agregar todos los cambios
git add .

# Commit
git commit -m "feat: Add GitHub Pages deployment"

# Push al repositorio
git push origin main
```

### 3️⃣ Configurar GitHub Pages en tu Repositorio

1. **Ve a tu repositorio en GitHub**
   - `https://github.com/[tu-usuario]/Proyecto_aws`

2. **Settings → Pages**
   - Click en el tab "Settings"
   - En el menú lateral, click en "Pages"

3. **Configurar Source**
   - **Branch**: Selecciona `main`
   - **Folder**: Selecciona `/docs`
   - Click en "Save"

4. **Esperar el Deploy**
   - GitHub comenzará a desplegar automáticamente
   - Verás un mensaje: "Your site is ready to be published at..."
   - El proceso toma 1-3 minutos

### 4️⃣ Verificar el Despliegue

Tu sitio estará disponible en:
```
https://[tu-usuario].github.io/Proyecto_aws/
```

**URLs disponibles:**
- **Presentación**: `https://[tu-usuario].github.io/Proyecto_aws/`
- **Dashboard**: `https://[tu-usuario].github.io/Proyecto_aws/dashboard`

---

## 🔄 Actualizar el Sitio

### Opción 1: Manual (Recomendado)

```bash
# Hacer cambios en el código
# ...

# Rebuild
npm run build:docs

# Commit y push
git add docs/
git commit -m "update: New changes"
git push origin main

# GitHub Pages se actualizará automáticamente
```

### Opción 2: Automático con GitHub Actions

El proyecto ya incluye un workflow de GitHub Actions que:
- ✅ Se ejecuta automáticamente al hacer push a `main`
- ✅ Genera el build
- ✅ Actualiza la carpeta `docs/`
- ✅ Hace commit y push automáticamente

**Para activarlo:**
1. Ve a Settings → Actions → General
2. Habilita "Read and write permissions"
3. Save

Ahora cada push a `main` actualizará automáticamente tu GitHub Pages.

---

## 🛠️ Configuración Avanzada

### Dominio Personalizado (Opcional)

Si tienes un dominio propio:

1. **Crear archivo CNAME**
   ```bash
   echo "tu-dominio.com" > docs/CNAME
   ```

2. **Configurar DNS**
   - Agregar registro A apuntando a:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

   - O registro CNAME:
     - `[tu-usuario].github.io`

3. **Actualizar en GitHub**
   - Settings → Pages → Custom domain
   - Ingresar tu dominio
   - Save

### Forzar HTTPS

En Settings → Pages:
- ✅ Marcar "Enforce HTTPS"

### Analytics (Opcional)

Agregar Google Analytics o similares editando `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🐛 Troubleshooting

### Problema: "404 al navegar a /dashboard"

**Solución**: Asegúrate que existe `docs/404.html`
```bash
npm run build:docs
```

### Problema: "CSS no se carga"

**Solución**: Verifica que `base` en `vite.config.ts` sea correcto:
```typescript
base: '/Proyecto_aws/'
```

### Problema: "GitHub Actions falla"

**Solución**: Verifica permisos en Settings → Actions:
- ✅ Read and write permissions

### Problema: "El sitio no se actualiza"

**Solución**:
1. Verifica que el workflow se ejecutó correctamente (Actions tab)
2. Clear cache del navegador (Ctrl + Shift + R)
3. Espera 2-3 minutos para propagación

---

## 📊 Verificación del Despliegue

### Checklist:

- [ ] Build generado en `docs/` exitosamente
- [ ] Archivo `.nojekyll` existe en `docs/`
- [ ] Archivo `404.html` existe en `docs/`
- [ ] Cambios commiteados y pusheados
- [ ] GitHub Pages configurado (Settings → Pages)
- [ ] Sitio accesible en `https://[tu-usuario].github.io/Proyecto_aws/`
- [ ] Navegación funciona (/, /dashboard)
- [ ] Estilos se cargan correctamente
- [ ] No hay errores en consola del navegador

---

## 📱 URLs del Proyecto Desplegado

Una vez configurado, tu proyecto estará disponible en:

| Ruta | Descripción | URL |
|------|-------------|-----|
| **Home** | Presentación del proyecto | `https://[tu-usuario].github.io/Proyecto_aws/` |
| **Dashboard** | Monitor de servicios AWS | `https://[tu-usuario].github.io/Proyecto_aws/dashboard` |

---

## 🎯 Próximos Pasos

1. **Compartir en LinkedIn**
   ```
   🚀 Excited to share my latest project: AWS E2E Data Engineering Platform!

   A complete OLTP → OLAP pipeline with:
   ✅ Apache Airflow orchestration
   ✅ dbt transformations
   ✅ AWS Glue ETL
   ✅ Redshift OLAP cubes
   ✅ React + TypeScript frontend

   Check it out: https://[tu-usuario].github.io/Proyecto_aws/

   #DataEngineering #AWS #BigData #FullStack
   ```

2. **Agregar al CV/Resume**
   - Link directo al proyecto
   - Screenshot del dashboard
   - Descripción técnica

3. **README en tu GitHub Profile**
   ```markdown
   ### 🌟 Featured Projects
   - [AWS E2E Data Platform](https://[tu-usuario].github.io/Proyecto_aws/) -
     Complete data engineering platform with Airflow, dbt, and AWS services
   ```

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la [documentación de GitHub Pages](https://docs.github.com/en/pages)
2. Verifica los logs en Actions tab
3. Abre un issue en el repositorio

---

<div align="center">

**🎉 ¡Tu proyecto está listo para impresionar a reclutadores!**

</div>
