# 🚀 Deploy Now - Quick Command Reference

## ⚡ Deploy in 5 Minutes

Copy and paste these commands in order:

### 1️⃣ Install Dependencies (1 min)

```bash
cd "D:\Users\One Drive\OneDrive - Universidad Tecnologica del Peru\Proyectos Portafolio\Proyecto_aws"
npm install
```

### 2️⃣ Build for GitHub Pages (1 min)

```bash
npm run build:docs
```

**Expected output**:
```
vite v5.0.12 building for production...
✓ built in 15.23s
✅ Created .nojekyll file
✅ Created 404.html for SPA routing
✅ Created README.md in docs/
🎉 GitHub Pages assets prepared successfully!
```

### 3️⃣ Initialize Git (if not done)

```bash
git init
git add .
git commit -m "feat: Complete AWS E2E Data Engineering Platform"
```

### 4️⃣ Create GitHub Repo & Push (2 min)

**A. Create repo on GitHub**:
1. Go to: https://github.com/new
2. Repo name: `Proyecto_aws`
3. Public
4. Don't initialize with README
5. Click "Create repository"

**B. Push code**:
```bash
# Replace [your-username] with your GitHub username
git remote add origin https://github.com/[your-username]/Proyecto_aws.git
git branch -M main
git push -u origin main
```

### 5️⃣ Enable GitHub Pages (1 min)

1. Go to: `https://github.com/[your-username]/Proyecto_aws`
2. **Settings** → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main`
5. **Folder**: `/docs`
6. Click **Save**
7. Wait 2-3 minutes

### 6️⃣ Visit Your Site! 🎉

```
https://[your-username].github.io/Proyecto_aws/
```

---

## 🔄 Update Deployed Site

After making changes to source code:

```bash
npm run build:docs
git add .
git commit -m "update: [describe changes]"
git push origin main
```

GitHub Pages will auto-update in 1-2 minutes.

---

## 📝 Optional: Enable Auto-Deploy

**To auto-build on every push**:

1. Go to: `https://github.com/[your-username]/Proyecto_aws`
2. **Settings** → **Actions** → **General**
3. **Workflow permissions**: Select "Read and write permissions"
4. **Save**

Now every push to `main` will automatically rebuild and deploy.

---

## ✅ Quick Verification

After deployment, check:

- [ ] `https://[your-username].github.io/Proyecto_aws/` → Shows presentation
- [ ] `https://[your-username].github.io/Proyecto_aws/dashboard` → Shows dashboard
- [ ] Navigation between pages works
- [ ] No 404 errors
- [ ] CSS loads correctly

---

## 🐛 Quick Fixes

### Build fails?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm run build:docs
```

### GitHub Pages shows 404?
```bash
npm run build:docs
git add docs/
git commit -m "fix: Rebuild docs"
git push
```

### CSS not loading?
Check `vite.config.ts` line 13:
```typescript
base: '/Proyecto_aws/', // Must match your repo name exactly
```

---

## 📱 Share Your Project

### LinkedIn (Copy & Paste)

```
🚀 Excited to share my latest project: AWS E2E Data Engineering Platform!

✅ Complete OLTP → OLAP pipeline
✅ Apache Airflow orchestration
✅ dbt transformations on Redshift
✅ AWS Glue ETL with PySpark
✅ React + TypeScript dashboard
✅ Infrastructure as Code

Live Demo: https://[your-username].github.io/Proyecto_aws/

Built with: AWS | Airflow | dbt | Python | TypeScript | React | Docker

#DataEngineering #AWS #BigData #FullStack #Python #React
```

### CV Projects Section

```
AWS E2E Data Engineering Platform
• Complete OLTP-to-OLAP pipeline processing 1M+ records
• Airflow orchestration with custom operators
• dbt dimensional modeling and OLAP cubes
• AWS Glue PySpark ETL jobs
• React + TypeScript monitoring dashboard
• Demo: https://[your-username].github.io/Proyecto_aws/

Tech: AWS, Airflow, dbt, Python, PySpark, TypeScript, React
```

---

<div align="center">

## 🎉 Your Project is Ready!

**Professional, production-ready, and ready to impress recruiters**

**Questions?** Check:
- [PRE_DEPLOYMENT_CHECKLIST.md](PRE_DEPLOYMENT_CHECKLIST.md) - Detailed guide
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete documentation
- [GITHUB_PAGES_SETUP.md](GITHUB_PAGES_SETUP.md) - GitHub Pages specifics

</div>
