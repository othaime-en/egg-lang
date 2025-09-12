/**
 * Egg Programming Language
 * Main module that ties everything together
 */

const { parse } = require("./parser");
const { evaluate } = require("./evaluator");
const { topScope } = require("./environment");
const fs = require("fs");
const path = require("path");

/**
 * Runs an Egg program string
 * @param {string} program - The Egg program code
 * @returns {*} - The result of running the program
 */
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

/**
 * Runs an Egg program from a file
 * @param {string} filename - Path to the .egg file
 * @returns {*} - The result of running the program
 */
function runFile(filename) {
  try {
    const program = fs.readFileSync(filename, "utf8");
    return run(program);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${filename}`);
    }
    throw error;
  }
}

/**
 * Interactive REPL for the Egg language
 */
function startREPL() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "egg> ",
  });

  console.log("Egg Programming Language REPL");
  console.log("Type .exit to quit, .help for help");
  rl.prompt();

  rl.on("line", (line) => {
    const input = line.trim();

    if (input === ".exit") {
      console.log("Goodbye!");
      process.exit(0);
    } else if (input === ".help") {
      console.log(`
Egg Language Help:
- Variables: define(x, 10)
- Functions: define(add, fun(a, b, +(a, b)))
- Conditionals: if(>(x, 5), print("big"), print("small"))
- Loops: while(<(x, 10), do(print(x), define(x, +(x, 1))))
- Arrays: array(1, 2, 3), length(arr), element(arr, 0)
- Comments: # This is a comment
`);
    } else if (input.length > 0) {
      try {
        const result = run(input);
        console.log(result);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    rl.prompt();
  });

  rl.on("close", () => {
    console.log("Goodbye!");
    process.exit(0);
  });
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    startREPL();
  } else if (args[0] === "--repl" || args[0] === "-i") {
    startREPL();
  } else {
    // Run file
    const filename = args[0];
    try {
      runFile(filename);
    } catch (error) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  }
}

module.exports = { run, runFile, startREPL, parse, evaluate, topScope };
