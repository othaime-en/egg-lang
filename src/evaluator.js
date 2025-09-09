/**
 * Egg Language Evaluator
 * Executes the Abstract Syntax Tree (AST) produced by the parser
 */

// Import special forms (will be defined in special-forms.js)
const specialForms = require("./special-forms");

/**
 * Evaluates an expression in the given scope
 * @param {Object} expr - The expression to evaluate (AST node)
 * @param {Object} scope - The current scope (environment)
 * @returns {*} - The result of evaluating the expression
 */
function evaluate(expr, scope) {
  // Handle literal values (numbers, strings) here
  if (expr.type == "value") {
    return expr.value;
  }

  // Handle variable references (words/identifiers) here
  else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  }

  // Handle function applications and special forms here
  else if (expr.type == "apply") {
    let { operator, args } = expr;

    // Check if this is a special form (if, while, define, etc.)
    if (operator.type == "word" && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      // Regular function call - evaluate operator and arguments
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}

module.exports = { evaluate };
