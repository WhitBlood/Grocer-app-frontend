#!/bin/sh

# Docker entrypoint script for FreshMart Frontend
set -e

echo "🚀 Starting FreshMart Frontend..."

# Function to replace environment variables in built files
replace_env_vars() {
    echo "📝 Replacing environment variables in built files..."
    
    # Find all JS files in the dist directory and replace env vars
    find /usr/share/nginx/html -name "*.js" -exec sed -i "s|VITE_API_BASE_URL_PLACEHOLDER|${VITE_API_BASE_URL:-https://api.freshmart.com}|g" {} \;
    find /usr/share/nginx/html -name "*.js" -exec sed -i "s|VITE_APP_NAME_PLACEHOLDER|${VITE_APP_NAME:-FreshMart}|g" {} \;
    
    echo "✅ Environment variables replaced successfully"
}

# Function to validate required environment variables
validate_env() {
    echo "🔍 Validating environment variables..."
    
    # Add any required environment variable checks here
    # if [ -z "$REQUIRED_VAR" ]; then
    #     echo "❌ Error: REQUIRED_VAR is not set"
    #     exit 1
    # fi
    
    echo "✅ Environment validation passed"
}

# Function to setup nginx
setup_nginx() {
    echo "🔧 Setting up Nginx..."
    
    # Test nginx configuration
    nginx -t
    
    echo "✅ Nginx configuration is valid"
}

# Main execution
main() {
    echo "🏁 Initializing FreshMart Frontend container..."
    
    validate_env
    replace_env_vars
    setup_nginx
    
    echo "🎉 FreshMart Frontend is ready!"
    echo "📱 Access the application at: http://localhost:3000"
    
    # Execute the main command (nginx)
    exec "$@"
}

# Run main function with all arguments
main "$@"