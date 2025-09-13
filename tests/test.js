/**
 * Test suite for the Egg programming language
 */

const { run, parse } = require("../src/egg");

// Simple test framework
function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`);
  }
}

function assertEquals(actual, expected, message = "") {
  if (actual !== expected) {
    throw new Error(`Expected ${expected}, got ${actual}. ${message}`);
  }
}

console.log("Running Egg Language Tests...\n");

// Basic parsing tests
test("Parse number", () => {
  const ast = parse("42");
  assertEquals(ast.type, "value");
  assertEquals(ast.value, 42);
});

test("Parse string", () => {
  const ast = parse('"hello"');
  assertEquals(ast.type, "value");
  assertEquals(ast.value, "hello");
});

test("Parse word", () => {
  const ast = parse("foo");
  assertEquals(ast.type, "word");
  assertEquals(ast.name, "foo");
});

test("Parse application", () => {
  const ast = parse("+(1, 2)");
  assertEquals(ast.type, "apply");
  assertEquals(ast.operator.name, "+");
  assertEquals(ast.args.length, 2);
});
