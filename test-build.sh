#!/bin/bash

# Quick test script for FreshMart build

echo "🧪 Testing FreshMart Build Process..."

# Test 1: Check if all config files exist
echo "📋 Checking configuration files..."
files=("package.json" "vite.config.js" "postcss.config.js" "tailwind.config.js" "index.html")
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Test 2: Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Test 3: Try to build
echo "🔨 Testing build process..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output created in dist/ directory"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Ready for Docker build."
echo "💡 Run: docker build -t freshmart-frontend ."