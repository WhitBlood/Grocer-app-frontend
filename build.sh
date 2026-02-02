#!/bin/bash

# FreshMart Docker Build Script

echo "🍃 Building FreshMart Frontend..."

# Clean up any previous builds
echo "🧹 Cleaning up..."
rm -rf node_modules dist

# Check if package-lock.json exists, if not create it
if [ ! -f "package-lock.json" ]; then
    echo "📦 Generating package-lock.json..."
    npm install --package-lock-only
fi

# Try building locally first to catch any issues
echo "🔧 Testing local build..."
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Local build successful!"
    
    # Test nginx configuration
    echo "🔧 Testing nginx configuration..."
    docker run --rm -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx:alpine nginx -t
    
    if [ $? -eq 0 ]; then
        echo "✅ Nginx configuration is valid!"
        
        # Build Docker image
        echo "🐳 Building Docker image..."
        docker build -t freshmart-frontend .

        # Check if Docker build was successful
        if [ $? -eq 0 ]; then
            echo "✅ Docker build successful!"
            echo "🚀 To run the container:"
            echo "   docker run -p 3000:80 freshmart-frontend"
            echo ""
            echo "🐳 Or use docker-compose:"
            echo "   docker-compose up"
        else
            echo "❌ Docker build failed!"
            echo "💡 Try using the simple nginx Dockerfile:"
            echo "   docker build -f Dockerfile.nginx-simple -t freshmart-simple ."
        fi
    else
        echo "❌ Nginx configuration is invalid!"
        echo "💡 Using simple nginx configuration..."
        docker build -f Dockerfile.nginx-simple -t freshmart-simple .
        echo "🚀 Run with: docker run -p 3000:80 freshmart-simple"
    fi
else
    echo "❌ Local build failed!"
    echo "💡 Check the error messages above and fix any issues."
    echo "🔧 Common fixes:"
    echo "   - Make sure all dependencies are installed: npm install"
    echo "   - Check for syntax errors in config files"
    echo "   - Ensure all imports are correct"
fi