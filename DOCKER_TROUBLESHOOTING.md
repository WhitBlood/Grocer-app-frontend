# 🐳 Docker Build Troubleshooting Guide

## Common Issues and Solutions

### 1. **PostCSS Configuration Error**
```
SyntaxError: Unexpected token 'export'
```

**Solution:** The package.json now includes `"type": "module"` to support ES modules.

### 2. **Missing package-lock.json**
```
npm ci can only install with an existing package-lock.json
```

**Solutions:**
- Run `npm install` to generate package-lock.json
- Use the simple Dockerfile: `docker build -f Dockerfile.simple -t freshmart-simple .`

### 3. **Build Commands**

#### Option 1: Standard Build (Nginx)
```bash
docker build -t freshmart-frontend .
docker run -p 3000:80 freshmart-frontend
```

#### Option 2: Simple Build (Node serve)
```bash
docker build -f Dockerfile.simple -t freshmart-simple .
docker run -p 3000:3000 freshmart-simple
```

#### Option 3: Docker Compose
```bash
docker-compose up --build
```

### 4. **Local Testing First**
Before building Docker image, test locally:
```bash
npm install
npm run build
npm run preview
```

### 5. **Clean Build**
If you encounter caching issues:
```bash
# Clean Docker
docker system prune -a

# Clean npm
rm -rf node_modules package-lock.json
npm install

# Clean build
rm -rf dist
npm run build
```

### 6. **Alternative: Use the Build Script**
```bash
chmod +x build.sh
./build.sh
```

## File Structure Check
Make sure these files exist:
- ✅ package.json (with "type": "module")
- ✅ vite.config.js
- ✅ postcss.config.js
- ✅ tailwind.config.js
- ✅ index.html
- ✅ src/ directory with React components

## Quick Fix Commands
```bash
# Generate package-lock.json
npm install --package-lock-only

# Test build locally
npm run build

# Build with simple Dockerfile
docker build -f Dockerfile.simple -t freshmart .

# Run simple container
docker run -p 3000:3000 freshmart
```