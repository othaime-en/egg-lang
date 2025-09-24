/**
 * Egg Language Evaluator
 * Executes the Abstract Syntax Tree (AST) produced by the parser
 */

/**
 * Enhanced error classes with position information
 */
class EggReferenceError extends ReferenceError {
  constructor(message, expr) {
    const pos =
      expr && expr.line ? ` at line ${expr.line}, column ${expr.column}` : "";
    super(message + pos);
    this.name = "EggReferenceError";
    if (expr) {
      this.line = expr.line;
      this.column = expr.column;
    }
  }
}

class EggTypeError extends TypeError {
  constructor(message, expr) {
    const pos =
      expr && expr.line ? ` at line ${expr.line}, column ${expr.column}` : "";
    super(message + pos);
    this.name = "EggTypeError";
    if (expr) {
      this.line = expr.line;
      this.column = expr.column;
    }
  }
}

// Special forms will be injected to avoid circular dependency
let specialForms = {};

/**
 * Evaluates an expression in the given scope
 * @param {Object} expr - The expression to evaluate (AST node)
 * @param {Object} scope - The current scope (environment)
 * @returns {*} - The result of evaluating the expression
 */
function evaluate(expr, scope) {
  try {
    // Handle literal values (numbers, strings)
    if (expr.type == "value") {
      return expr.value;
    }

    // Handle variable references (words/identifiers)
    else if (expr.type == "word") {
      if (expr.name in scope) {
        return scope[expr.name];
      } else {
        throw new EggReferenceError(`Undefined binding: ${expr.name}`, expr);
      }
    }

    // Handle function applications and special forms
    else if (expr.type == "apply") {
      let { operator, args } = expr;

      // Check if this is a special form (if, while, define, etc.)
      if (operator.type == "word" && operator.name in specialForms) {
        return specialForms[operator.name](expr.args, scope, expr);
      } else {
        // Regular function call - evaluate operator and arguments
        let op = evaluate(operator, scope);
        if (typeof op == "function") {
          return op(...args.map((arg) => evaluate(arg, scope)));
        } else {
          throw new EggTypeError("Applying a non-function", expr);
        }
      }
    }

    throw new EggTypeError(`Unknown expression type: ${expr.type}`, expr);
  } catch (error) {
    // Re-throw our custom errors as-is
    if (error instanceof EggReferenceError || error instanceof EggTypeError) {
      throw error;
    }

    // Wrap other errors with position information if available
    if (expr && expr.line && expr.column) {
      error.message += ` at line ${expr.line}, column ${expr.column}`;
    }
    throw error;
  }
}

/**
 * Sets the special forms object (used to avoid circular dependency)
 * @param {Object} forms - The special forms object
 */
function setSpecialForms(forms) {
  specialForms = forms;
}

module.exports = { evaluate, setSpecialForms, EggReferenceError, EggTypeError };
