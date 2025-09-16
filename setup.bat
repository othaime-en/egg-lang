@echo off
REM Egg Language Setup Script for Windows

echo Setting up Egg Programming Language...

REM Create directory structure
echo Creating directory structure...
if not exist "egg-language" mkdir egg-language
cd egg-language
if not exist "src" mkdir src
if not exist "examples" mkdir examples
if not exist "tests" mkdir tests

echo ✓ Directory structure created

REM Run tests to verify everything works
echo Running tests...
node tests/test.js

echo.
echo 🥚 Egg Language setup complete!
echo.
echo Try these commands:
echo   node src/egg.js examples/basic.egg      # Run basic example
echo   node src/egg.js examples/functions.egg  # Run functions example  
echo   node src/egg.js examples/arrays.egg     # Run arrays example
echo   node src/egg.js --repl                  # Start interactive shell
echo   npm test                                # Run test suite
echo.
pause