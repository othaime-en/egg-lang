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

topScope.trim = (str) => {
  if (typeof str !== "string") {
    throw new TypeError("trim() requires a string argument");
  }
  return str.trim();
};

topScope.split = (str, separator, limit) => {
  if (typeof str !== "string") {
    throw new TypeError("split() requires a string as first argument");
  }
  if (limit === undefined) return str.split(separator);
  return str.split(separator, limit);
};

topScope.replace = (str, searchValue, replaceValue) => {
  if (typeof str !== "string") {
    throw new TypeError("replace() requires a string as first argument");
  }
  return str.replace(searchValue, replaceValue);
};

topScope.startsWith = (str, searchString, position) => {
  if (typeof str !== "string" || typeof searchString !== "string") {
    throw new TypeError("startsWith() requires string arguments");
  }
  return str.startsWith(searchString, position || 0);
};

topScope.endsWith = (str, searchString, length) => {
  if (typeof str !== "string" || typeof searchString !== "string") {
    throw new TypeError("endsWith() requires string arguments");
  }
  if (length === undefined) return str.endsWith(searchString);
  return str.endsWith(searchString, length);
};

topScope.repeat = (str, count) => {
  if (typeof str !== "string") {
    throw new TypeError("repeat() requires a string as first argument");
  }
  return str.repeat(count);
};

// Enhanced array operations
topScope.push = (array, ...elements) => {
  if (!Array.isArray(array)) {
    throw new TypeError("push() requires an array as first argument");
  }
  array.push(...elements);
  return array.length;
};

topScope.pop = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError("pop() requires an array");
  }
  return array.pop();
};

topScope.shift = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError("shift() requires an array");
  }
  return array.shift();
};

topScope.unshift = (array, ...elements) => {
  if (!Array.isArray(array)) {
    throw new TypeError("unshift() requires an array as first argument");
  }
  array.unshift(...elements);
  return array.length;
};

topScope.slice = (array, start, end) => {
  if (!Array.isArray(array)) {
    throw new TypeError("slice() requires an array as first argument");
  }
  if (end === undefined) return array.slice(start);
  return array.slice(start, end);
};

topScope.join = (array, separator) => {
  if (!Array.isArray(array)) {
    throw new TypeError("join() requires an array as first argument");
  }
  return array.join(separator === undefined ? "," : separator);
};

topScope.reverse = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError("reverse() requires an array");
  }
  return array.reverse();
};

topScope.sort = (array, compareFn) => {
  if (!Array.isArray(array)) {
    throw new TypeError("sort() requires an array as first argument");
  }
  if (compareFn === undefined) {
    return array.sort();
  }
  return array.sort(compareFn);
};

topScope.includes = (array, searchElement, fromIndex) => {
  if (!Array.isArray(array)) {
    throw new TypeError("includes() requires an array as first argument");
  }
  return array.includes(searchElement, fromIndex || 0);
};

topScope.find = (array, callback) => {
  if (!Array.isArray(array)) {
    throw new TypeError("find() requires an array as first argument");
  }
  if (typeof callback !== "function") {
    throw new TypeError("find() requires a function as second argument");
  }
  return array.find(callback);
};

topScope.filter = (array, callback) => {
  if (!Array.isArray(array)) {
    throw new TypeError("filter() requires an array as first argument");
  }
  if (typeof callback !== "function") {
    throw new TypeError("filter() requires a function as second argument");
  }
  return array.filter(callback);
};

topScope.map = (array, callback) => {
  if (!Array.isArray(array)) {
    throw new TypeError("map() requires an array as first argument");
  }
  if (typeof callback !== "function") {
    throw new TypeError("map() requires a function as second argument");
  }
  return array.map(callback);
};

topScope.reduce = (array, callback, initialValue) => {
  if (!Array.isArray(array)) {
    throw new TypeError("reduce() requires an array as first argument");
  }
  if (typeof callback !== "function") {
    throw new TypeError("reduce() requires a function as second argument");
  }
  if (initialValue === undefined) {
    return array.reduce(callback);
  }
  return array.reduce(callback, initialValue);
};

topScope.forEach = (array, callback) => {
  if (!Array.isArray(array)) {
    throw new TypeError("forEach() requires an array as first argument");
  }
  if (typeof callback !== "function") {
    throw new TypeError("forEach() requires a function as second argument");
  }
  array.forEach(callback);
  return array; // Return array for chaining
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
