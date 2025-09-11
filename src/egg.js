/**
 * Egg Programming Language
 * This is the main module that ties everything together
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
function run(program) {}

/**
 * Runs an Egg program from a file
 * @param {string} filename - Path to the .egg file
 * @returns {*} - The result of running the program
 */
function runFile(filename) {}

/**
 * Interactive REPL for the Egg language
 */
function startREPL() {
  // Simple REPL implementation
}

// Command line interface
if (require.main === module) {
}

module.exports = { run, runFile, startREPL, parse, evaluate, topScope };
