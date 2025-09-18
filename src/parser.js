/**
 * Egg Language Parser
 * Parses Egg source code into an Abstract Syntax Tree (AST)
 */

/**
 * Enhanced error class with position information
 */
class EggSyntaxError extends SyntaxError {
  constructor(message, line = 1, column = 1) {
    super(`${message} at line ${line}, column ${column}`);
    this.line = line;
    this.column = column;
    this.name = "EggSyntaxError";
  }
}

/**
 * Tracks position in source code for better error reporting
 */
class SourcePosition {
  constructor(source) {
    this.source = source;
    this.pos = 0;
    this.line = 1;
    this.column = 1;
  }

  peek() {
    return this.source[this.pos] || "";
  }

  advance(count = 1) {
    for (let i = 0; i < count && this.pos < this.source.length; i++) {
      if (this.source[this.pos] === "\n") {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.pos++;
    }
  }

  remaining() {
    return this.source.slice(this.pos);
  }

  slice(start, end) {
    return this.source.slice(start, end);
  }

  clone() {
    const clone = new SourcePosition(this.source);
    clone.pos = this.pos;
    clone.line = this.line;
    clone.column = this.column;
    return clone;
  }
}

/**
 * Skips whitespace and comments from the current position
 * @param {SourcePosition} pos - The source position tracker
 */
function skipSpace(pos) {
  while (true) {
    const remaining = pos.remaining();
    // Match whitespace or comments (# to end of line)
    const match = remaining.match(/^(\s|#[^\n]*)*/);
    if (match[0].length === 0) break;
    pos.advance(match[0].length);
  }
}

/**
 * Parses a single expression from the program
 * @param {SourcePosition} pos - The source position tracker
 * @returns {Object} - The parsed expression with position info
 */
function parseExpression(pos) {
  skipSpace(pos);
  let match, expr;
  const startPos = pos.clone();
  const remaining = pos.remaining();

  // Parse string literals: "hello world"
  if ((match = /^"([^"]*)"/.exec(remaining))) {
    expr = {
      type: "value",
      value: match[1],
      line: startPos.line,
      column: startPos.column,
    };
    pos.advance(match[0].length);
  }
  // Parse numbers: 123, 45.67
  else if ((match = /^\d+(\.\d+)?/.exec(remaining))) {
    expr = {
      type: "value",
      value: Number(match[0]),
      line: startPos.line,
      column: startPos.column,
    };
    pos.advance(match[0].length);
  }
  // Parse words/identifiers: abc, +, if, while
  else if ((match = /^[^\s(),#"]+/.exec(remaining))) {
    expr = {
      type: "word",
      name: match[0],
      line: startPos.line,
      column: startPos.column,
    };
    pos.advance(match[0].length);
  } else {
    throw new EggSyntaxError(
      `Unexpected syntax: "${remaining.slice(0, 10)}..."`,
      pos.line,
      pos.column
    );
  }

  return parseApply(expr, pos);
}

/**
 * Parses function applications: func(arg1, arg2, ...)
 * @param {Object} expr - The expression that might be applied
 * @param {string} program - The remaining program string
 * @returns {Object} - Object containing the parsed expression and remaining string
 */
function parseApply(expr, program) {
  program = skipSpace(program);

  // If next character is not '(', this is not an application
  if (program[0] != "(") {
    return { expr: expr, rest: program };
  }

  // Skip opening parenthesis
  program = skipSpace(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };

  // Parse arguments until we find closing parenthesis
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);

    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  // Skip closing parenthesis and check for chained applications: func()(args)
  return parseApply(expr, program.slice(1));
}

/**
 * Main parse function - parses a complete Egg program
 * @param {string} program - The complete program string
 * @returns {Object} - The Abstract Syntax Tree (AST) for the program
 */
function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

module.exports = { parse, skipSpace, parseExpression, parseApply };
