/**
 * Egg Language Special Forms
 * Special syntax constructs that don't follow normal function evaluation rules
 */

// We'll receive the evaluate function to avoid circular dependency
let evaluate;

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
specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }

  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

/**
 * fun(param1, param2, ..., body) - Function definition
 * Creates a function with the given parameters and body
 */
specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }

  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map((expr) => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function (...args) {
    if (args.length != params.length) {
      throw new TypeError("Wrong number of arguments");
    }

    let localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
  };
};

/**
 * set(name, value) - Variable assignment
 * Updates an existing binding, searches outer scopes if necessary
 */
specialForms.set = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of set");
  }

  let name = args[0].name;
  let value = evaluate(args[1], scope);

  // Search through scope chain to find the binding
  for (
    let currentScope = scope;
    currentScope;
    currentScope = Object.getPrototypeOf(currentScope)
  ) {
    if (Object.hasOwn(currentScope, name)) {
      currentScope[name] = value;
      return value;
    }
  }

  throw new ReferenceError(`Undefined binding: ${name}`);
};

/**
 * Sets the evaluate function (used to avoid circular dependency)
 * @param {Function} evaluateFunction - The evaluate function
 */
function setEvaluate(evaluateFunction) {
  evaluate = evaluateFunction;
}

module.exports = { specialForms, setEvaluate };
