# THE EGG PROGRAMMING LANGUAGE

This is a simple programming language implementation based on the guide from [Eloquent JavaScript Chapter 12](https://eloquentjavascript.net/12_language.html). The book provides a basic level implementation. I've managed to a add on a few more features.

## Features

- **Functions**: First-class functions with closures
- **Control Flow**: `if` conditionals and `while` loops
- **Variables**: Variable definition and assignment
- **Arrays**: Built-in array support

## Installation

### Prerequisites

- Node.js (version 12 or higher)

### Setup Instructions

#### Option 1: Manual Setup

1. Create the project directory structure:

```
egg-language/
├── src/
├── examples/
└── tests/
```

2. Copy all the provided files into their respective directories
3. Navigate to the project directory: `cd egg-language`

#### Option 2: Using Setup Scripts

**On Unix/Linux/macOS:**

```bash
# Make setup script executable and run it
chmod +x setup.sh
./setup.sh
```

**On Windows:**

```cmd
# Run the Windows setup script
setup.bat
```

#### Option 3: Clone from Repository

```bash
git clone https://github.com/othaime-en/egg-lang
cd egg-lang
npm install
```

## Usage

### Running Programs

**All Platforms:**
Run an Egg program from a file:

```bash
# Using npm script
npm start examples/basic.egg

# Using Node directly
node src/egg.js examples/basic.egg
```

**Windows Command Prompt:**

```cmd
node src\egg.js examples\basic.egg
```

**PowerShell (Windows):**

```powershell
node src/egg.js examples/basic.egg
```

### Interactive REPL

Start the interactive shell:

```bash
npm run repl
# or
node src/egg.js --repl
```

### Running Tests

Execute the test suite:

```bash
npm test
```

## Language Syntax

### Basic Values

```egg
42          # Numbers
"hello"     # Strings
true        # Boolean true
false       # Boolean false
```

### Variables

```egg
define(x, 10)           # Define a variable
set(x, 20)             # Update existing variable
```

### Functions

```egg
# Simple function
define(square, fun(x, *(x, x)))
square(5)  # Returns 25

# Multiple parameters
define(add, fun(a, b, +(a, b)))

# Recursive functions
define(factorial, fun(n,
  if(==(n, 0),
     1,
     *(n, factorial(-(n, 1)))
  )
))
```

### Control Flow

```egg
# Conditional
if(>(x, 5), print("big"), print("small"))

# Loop
while(<(i, 10),
  do(
    print(i),
    define(i, +(i, 1))
  )
)

# Sequential execution
do(
  define(x, 5),
  define(y, 10),
  +(x, y)
)
```
