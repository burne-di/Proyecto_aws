/**
 * Script to copy additional assets to docs folder for GitHub Pages
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const docsDir = path.join(projectRoot, 'docs')

// Create .nojekyll file to prevent Jekyll processing
const nojekyllPath = path.join(docsDir, '.nojekyll')
fs.writeFileSync(nojekyllPath, '')
console.log('✅ Created .nojekyll file')

// Create CNAME file if needed (uncomment and set your domain)
// const cnamePath = path.join(docsDir, 'CNAME')
// fs.writeFileSync(cnamePath, 'your-domain.com')
// console.log('✅ Created CNAME file')

// Create 404.html for SPA routing
const html404Content = fs.readFileSync(path.join(docsDir, 'index.html'), 'utf-8')
const html404Path = path.join(docsDir, '404.html')
fs.writeFileSync(html404Path, html404Content)
console.log('✅ Created 404.html for SPA routing')

// Create README for docs folder
const readmeContent = `# GitHub Pages Build

This folder contains the production build for GitHub Pages deployment.

**Do not edit files here directly** - they are automatically generated.

To rebuild:
\`\`\`bash
npm run build:docs
\`\`\`

## Configuration

- Served from: \`/Proyecto_aws/\`
- Build tool: Vite
- Framework: React + TypeScript

## Live Site

Visit: https://[your-username].github.io/Proyecto_aws/
`

const readmePath = path.join(docsDir, 'README.md')
fs.writeFileSync(readmePath, readmeContent)
console.log('✅ Created README.md in docs/')

// Copy images folder if exists
const publicImagesDir = path.join(projectRoot, 'public', 'images')
const docsImagesDir = path.join(docsDir, 'images')

if (fs.existsSync(publicImagesDir)) {
  if (!fs.existsSync(docsImagesDir)) {
    fs.mkdirSync(docsImagesDir, { recursive: true })
  }

  const imageFiles = fs.readdirSync(publicImagesDir)
  imageFiles.forEach(file => {
    const srcPath = path.join(publicImagesDir, file)
    const destPath = path.join(docsImagesDir, file)
    fs.copyFileSync(srcPath, destPath)
  })
  console.log(`✅ Copied ${imageFiles.length} image(s) to docs/images/`)
} else {
  console.log('⚠️  No public/images/ folder found - skipping image copy')
}

console.log('\n🎉 GitHub Pages assets prepared successfully!')
console.log('\n📝 Next steps:')
console.log('1. Commit the docs/ folder')
console.log('2. Push to GitHub')
console.log('3. Enable GitHub Pages in Settings → Pages')
console.log('4. Select "Deploy from a branch"')
console.log('5. Choose "main" branch and "/docs" folder')
console.log('6. Save and wait for deployment')
