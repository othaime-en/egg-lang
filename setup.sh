#!/bin/bash

# Egg Language Setup Script
# This script sets up the directory structure and necessary files for the Egg Language project.

echo "Setting up Egg Programming Language..."

# Create directory structure
echo "Creating directory structure..."
mkdir -p egg-language/{src,examples,tests}
cd egg-language

echo "✓ Directory structure created"

# Make the main script executable
chmod +x src/egg.js

echo "✓ Made egg.js executable"

# Run tests to verify everything works
echo "Running tests..."
node tests/test.js

echo ""
echo "🍳 Egg Language setup complete!"
echo ""
echo "Try these commands:"
echo "  node src/egg.js examples/basic.egg      # Run basic example"
echo "  node src/egg.js examples/functions.egg  # Run functions example"  
echo "  node src/egg.js examples/arrays.egg     # Run arrays example"
echo "  node src/egg.js --repl                  # Start interactive shell"
echo "  npm test                                # Run test suite"