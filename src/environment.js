/**
 * Egg Language Environment
 * Defines the global scope with built-in functions and values
 */

// Create the top-level scope
const topScope = Object.create(null);

// Boolean values
topScope.true = true;
topScope.false = false;

// Arithmetic and comparison operators
for (let op of ["+", "-", "*", "/", "==", "<", ">", "!=", ">=", "<="]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

// Logical operators
topScope["&&"] = Function("a, b", "return a && b;");
topScope["||"] = Function("a, b", "return a || b;");
topScope["!"] = Function("a", "return !a;");

// Print function for output
topScope.print = (value) => {
  console.log(value);
  return value;
};

// Array functions for the exercises
topScope.array = (...values) => values;

topScope.length = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError("length() requires an array");
  }
  return array.length;
};

topScope.element = (array, n) => {
  if (!Array.isArray(array)) {
    throw new TypeError("element() requires an array as first argument");
  }
  if (typeof n !== "number" || n < 0 || n >= array.length) {
    throw new RangeError("Array index out of bounds");
  }
  return array[n];
};

// Additional utility functions
topScope.type = (value) => {
  if (Array.isArray(value)) return "array";
  return typeof value;
};

topScope.abs = Math.abs;
topScope.min = Math.min;
topScope.max = Math.max;
topScope.floor = Math.floor;
topScope.ceil = Math.ceil;
topScope.round = Math.round;
topScope.random = Math.random;

module.exports = { topScope };
