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

// Basic evaluation tests
test("Evaluate number", () => {
  const result = run("42");
  assertEquals(result, 42);
});

test("Evaluate string", () => {
  const result = run('"hello"');
  assertEquals(result, "hello");
});

test("Basic arithmetic", () => {
  assertEquals(run("+(1, 2)"), 3);
  assertEquals(run("-(5, 3)"), 2);
  assertEquals(run("*(4, 3)"), 12);
  assertEquals(run("/(8, 2)"), 4);
});

test("Comparison operators", () => {
  assertEquals(run(">(5, 3)"), true);
  assertEquals(run("<(3, 5)"), true);
  assertEquals(run("==(3, 3)"), true);
  assertEquals(run("!=(3, 5)"), true);
});

// Variable tests
test("Define and use variable", () => {
  const result = run(`
    do(
      define(x, 10),
      x
    )
  `);
  assertEquals(result, 10);
});

test("Variable scope", () => {
  const result = run(`
    do(
      define(x, 5),
      define(f, fun(y, +(x, y))),
      f(3)
    )
  `);
  assertEquals(result, 8);
});

// Control flow tests
test("If statement - true branch", () => {
  const result = run("if(true, 42, 0)");
  assertEquals(result, 42);
});

test("If statement - false branch", () => {
  const result = run("if(false, 42, 0)");
  assertEquals(result, 0);
});

test("While loop", () => {
  const result = run(`
    do(
      define(sum, 0),
      define(i, 1),
      while(<(i, 4),
        do(
          define(sum, +(sum, i)),
          define(i, +(i, 1))
        )
      ),
      sum
    )
  `);
  assertEquals(result, 6); // 1 + 2 + 3
});

// Function tests
test("Simple function", () => {
  const result = run(`
    do(
      define(square, fun(x, *(x, x))),
      square(5)
    )
  `);
  assertEquals(result, 25);
});

test("Function with multiple parameters", () => {
  const result = run(`
    do(
      define(add, fun(a, b, +(a, b))),
      add(3, 4)
    )
  `);
  assertEquals(result, 7);
});

test("Recursive function", () => {
  const result = run(`
    do(
      define(factorial, fun(n,
        if(==(n, 0),
           1,
           *(n, factorial(-(n, 1)))
        )
      )),
      factorial(5)
    )
  `);
  assertEquals(result, 120);
});

test("Closure", () => {
  const result = run(`
    do(
      define(makeAdder, fun(n, fun(x, +(x, n)))),
      define(add5, makeAdder(5)),
      add5(10)
    )
  `);
  assertEquals(result, 15);
});

// Array tests
test("Create array", () => {
  const result = run("array(1, 2, 3)");
  assertEquals(Array.isArray(result), true);
  assertEquals(result.length, 3);
  assertEquals(result[0], 1);
});

test("Array length", () => {
  const result = run("length(array(1, 2, 3, 4))");
  assertEquals(result, 4);
});

test("Array element access", () => {
  const result = run("element(array(10, 20, 30), 1)");
  assertEquals(result, 20);
});

test("Array sum function", () => {
  const result = run(`
    do(
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
      sum(array(1, 2, 3, 4))
    )
  `);
  assertEquals(result, 10);
});
