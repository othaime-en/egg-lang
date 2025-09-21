# THE EGG PROGRAMMING LANGUAGE

This is a simple programming language implementation based on the guide from [Eloquent JavaScript Chapter 12](https://eloquentjavascript.net/12_language.html). The book provides a basic level implementation. I've managed to a add on a few more features.

## Features

- **Simple Syntax**: Everything is an expression
- **Functions**: First-class functions with closures
- **Control Flow**: `if` conditionals and `while` loops
- **Variables**: Variable definition and assignment
- **Arrays**: Built-in array support
- **Comments**: Line comments starting with `#`
- **REPL**: Interactive shell for testing

## Architecture

The language implementation consists of several modules:

- **parser.js** - Converts source code into Abstract Syntax Tree (AST)
- **evaluator.js** - Executes the AST
- **special-forms.js** - Implements special syntax (if, while, define, etc.)
- **environment.js** - Defines built-in functions and global scope
- **egg.js** - Main module with CLI and REPL

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

### Arrays

```egg
define(arr, array(1, 2, 3, 4))   # Create array
length(arr)                      # Get length
element(arr, 0)                  # Get element at index
```

### Comments

```egg
# This is a comment
define(x, 5)  # Comments can be at end of line
# Multiple lines of comments
# are supported
```

## Built-in Functions

### Arithmetic

- `+(a, b)` - Addition
- `-(a, b)` - Subtraction
- `*(a, b)` - Multiplication
- `/(a, b)` - Division

### Comparison

- `==(a, b)` - Equality
- `!=(a, b)` - Inequality
- `<(a, b)` - Less than
- `>(a, b)` - Greater than
- `<=(a, b)` - Less than or equal
- `>=(a, b)` - Greater than or equal

### Logic

- `&&(a, b)` - Logical AND
- `||(a, b)` - Logical OR
- `!(a)` - Logical NOT

### Arrays

- `array(...values)` - Create array
- `length(array)` - Get array length
- `element(array, index)` - Get element at index

### Utility

- `print(value)` - Print value to console
- `type(value)` - Get type of value

### Math

- `abs(n)` - Absolute value
- `min(a, b)` - Minimum
- `max(a, b)` - Maximum
- `floor(n)` - Floor
- `ceil(n)` - Ceiling
- `round(n)` - Round
- `random()` - Random number 0-1

## Examples

### Sum of Numbers 1-10

```egg
do(
  define(total, 0),
  define(count, 1),
  while(<(count, 11),
    do(
      define(total, +(total, count)),
      define(count, +(count, 1))
    )
  ),
  print(total)  # Prints 55
)
```

### Fibonacci Sequence

```egg
do(
  define(fib, fun(n,
    if(<(n, 2),
       n,
       +(fib(-(n, 1)), fib(-(n, 2)))
    )
  )),
  print(fib(10))  # Prints 55
)
```

### Array Processing

```egg
do(
  define(numbers, array(5, 2, 8, 1, 9)),
  define(sum, fun(arr,
    do(
      define(i, 0),
      define(total, 0),
      while(<(i, length(arr)),
        do(
          define(total, +(total, element(arr, i))),
          define(i, +(i, 1))
        )
      ),
      total
    )
  )),
  print(sum(numbers))  # Prints 25
)
```
