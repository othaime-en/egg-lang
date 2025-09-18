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

// String operations
topScope.concat = (str1, str2) => {
  if (typeof str1 !== "string" || typeof str2 !== "string") {
    throw new TypeError("concat() requires string arguments");
  }
  return str1 + str2;
};

topScope.length = (value) => {
  if (typeof value === "string") return value.length;
  if (Array.isArray(value)) return value.length;
  throw new TypeError("length() requires a string or array");
};

topScope.substring = (str, start, end) => {
  if (typeof str !== "string") {
    throw new TypeError("substring() requires a string as first argument");
  }
  if (end === undefined) return str.substring(start);
  return str.substring(start, end);
};

topScope.charAt = (str, index) => {
  if (typeof str !== "string") {
    throw new TypeError("charAt() requires a string as first argument");
  }
  return str.charAt(index);
};

topScope.indexOf = (str, searchStr, fromIndex) => {
  if (typeof str !== "string" || typeof searchStr !== "string") {
    throw new TypeError("indexOf() requires string arguments");
  }
  return str.indexOf(searchStr, fromIndex || 0);
};

topScope.toLowerCase = (str) => {
  if (typeof str !== "string") {
    throw new TypeError("toLowerCase() requires a string argument");
  }
  return str.toLowerCase();
};

topScope.toUpperCase = (str) => {
  if (typeof str !== "string") {
    throw new TypeError("toUpperCase() requires a string argument");
  }
  return str.toUpperCase();
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
