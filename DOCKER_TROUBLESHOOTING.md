# 🐳 Docker Build Troubleshooting Guide

## Common Issues and Solutions

### 1. **Nginx Configuration Error**
```
nginx: [emerg] invalid value "must-revalidate" in /etc/nginx/nginx.conf:21
```

**Solution:** Fixed the invalid `gzip_proxied` directive in nginx.conf.

### 2. **PostCSS Configuration Error**
```
SyntaxError: Unexpected token 'export'
```

**Solution:** The package.json now includes `"type": "module"` to support ES modules.

### 3. **Missing package-lock.json**
```
npm ci can only install with an existing package-lock.json
```

**Solutions:**
- Run `npm install` to generate package-lock.json
- Use the simple Dockerfile: `docker build -f Dockerfile.simple -t freshmart-simple .`

### 4. **Build Commands**

#### Option 1: Standard Build (Nginx - Recommended)
```bash
docker build -t freshmart-frontend .
docker run -p 3000:80 freshmart-frontend
```

#### Option 2: Simple Nginx Build
```bash
docker build -f Dockerfile.nginx-simple -t freshmart-simple .
docker run -p 3000:80 freshmart-simple
```

#### Option 3: Node Serve Build
```bash
docker build -f Dockerfile.simple -t freshmart-node .
docker run -p 3000:3000 freshmart-node
```

#### Option 4: Docker Compose
```bash
docker-compose up --build
```

### 5. **Test Nginx Configuration**
```bash
# Test nginx config before building
docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:alpine nginx -t
```

### 6. **Local Testing First**
Before building Docker image, test locally:
```bash
npm install
npm run build
npm run preview
```

### 7. **Clean Build**
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

### 8. **Use the Build Script**
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
- ✅ nginx.conf (fixed configuration)
- ✅ index.html
- ✅ src/ directory with React components

## Quick Fix Commands
```bash
# Generate package-lock.json
npm install --package-lock-only

# Test build locally
npm run build

# Test nginx config
docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:alpine nginx -t

# Build with simple nginx
docker build -f Dockerfile.nginx-simple -t freshmart .

# Run container
docker run -p 3000:80 freshmart
```

## Container Access
Once running, access your app at:
- **Application**: http://localhost:3000
- **Health Check**: http://localhost:3000/health