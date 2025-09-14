#!/bin/bash

# Egg Language Setup Script
# This script sets up the directory structure and necessary files for the Egg Language project.

# Create directory structure
echo "Creating directory structure..."
mkdir -p egg-language/{src,examples,tests}
cd egg-language

# Make the main script executable
chmod +x src/egg.js

echo "✓ Made egg.js executable"

# Run tests to verify everything works
echo "Running tests..."
node tests/test.js

echo ""
echo "🎉 Egg Language setup complete!"
echo ""
echo "You can now start using the Egg Language!"