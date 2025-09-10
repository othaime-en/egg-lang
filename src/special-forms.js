/**
 * Egg Language Special Forms
 * Special syntax constructs that don't follow normal function evaluation rules
 */

const { evaluate } = require("./evaluator");

// Container for all special forms
const specialForms = Object.create(null);

/**
 * if(condition, then, else) - Conditional expression
 * Only evaluates the appropriate branch based on condition
 */
specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

/**
 * while(condition, body) - Loop construct
 * Repeatedly evaluates body while condition is truthy
 */
specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }

  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined doesn't exist in Egg, return false for lack of meaningful result
  return false;
};

/**
 * do(expr1, expr2, ...) - Sequential execution
 * Evaluates all expressions in order, returns the result of the last one
 */
specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

/**
 * define(name, value) - Variable definition
 * Creates a new binding in the current scope
 */
specialForms.define = (args, scope) => {};

/**
 * fun(param1, param2, ..., body) - Function definition
 * Creates a function with the given parameters and body
 */
specialForms.fun = (args, scope) => {};

/**
 * set(name, value) - Variable assignment
 * Updates an existing binding, searches outer scopes if necessary
 */
specialForms.set = (args, scope) => {};

module.exports = specialForms;
