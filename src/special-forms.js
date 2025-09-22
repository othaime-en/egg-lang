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
specialForms.if = (args, scope, expr) => {
  if (args.length != 3) {
    throw new EggSyntaxError(
      "Wrong number of args to if",
      expr?.line,
      expr?.column
    );
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
specialForms.while = (args, scope, expr) => {
  if (args.length != 2) {
    throw new EggSyntaxError(
      "Wrong number of args to while",
      expr?.line,
      expr?.column
    );
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
specialForms.define = (args, scope, expr) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new EggSyntaxError(
      "Incorrect use of define",
      expr?.line,
      expr?.column
    );
  }

  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

/**
 * fun(param1, param2, ..., body) - Function definition
 * Creates a function with the given parameters and body
 */
specialForms.fun = (args, scope, expr) => {
  if (!args.length) {
    throw new EggSyntaxError("Functions need a body", expr?.line, expr?.column);
  }

  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map((paramExpr) => {
    if (paramExpr.type != "word") {
      throw new EggSyntaxError(
        "Parameter names must be words",
        paramExpr?.line,
        paramExpr?.column
      );
    }
    return paramExpr.name;
  });

  return function (...args) {
    if (args.length != params.length) {
      throw new EggTypeError(
        `Wrong number of arguments: expected ${params.length}, got ${args.length}`
      );
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
specialForms.set = (args, scope, expr) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new EggSyntaxError("Incorrect use of set", expr?.line, expr?.column);
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

  throw new EggReferenceError(`Undefined binding: ${name}`, args[0]);
};

/**
 * class(name, constructor, ...methods) - Class definition
 * Creates a constructor function with prototype methods
 */
specialForms.class = (args, scope, expr) => {
  if (args.length < 2) {
    const pos =
      expr && expr.line ? ` at line ${expr.line}, column ${expr.column}` : "";
    throw new SyntaxError(
      "class requires at least a name and constructor" + pos
    );
  }

  if (args[0].type !== "word") {
    const pos =
      args[0] && args[0].line
        ? ` at line ${args[0].line}, column ${args[0].column}`
        : "";
    throw new SyntaxError("Class name must be a word" + pos);
  }

  const className = args[0].name;
  const constructorDef = args[1];
  const methods = args.slice(2);

  // Evaluate the constructor function
  const constructor = evaluate(constructorDef, scope);
  if (typeof constructor !== "function") {
    const pos =
      args[1] && args[1].line
        ? ` at line ${args[1].line}, column ${args[1].column}`
        : "";
    throw new TypeError("Class constructor must be a function" + pos);
  }

  // Create the class constructor function
  function ClassConstructor(...args) {
    // Create instance object
    const instance = {};

    // Set up prototype chain
    Object.setPrototypeOf(instance, ClassConstructor.prototype);

    // Call constructor with instance as 'this' context
    const result = constructor.call(instance, instance, ...args);

    // Return the instance (constructor should modify the passed instance)
    return instance;
  }

  // Add methods to prototype
  methods.forEach((methodDef, index) => {
    if (
      methodDef.type !== "apply" ||
      methodDef.operator.type !== "word" ||
      methodDef.operator.name !== "method" ||
      methodDef.args.length !== 2
    ) {
      const pos =
        methodDef && methodDef.line
          ? ` at line ${methodDef.line}, column ${methodDef.column}`
          : "";
      throw new SyntaxError(
        "Class methods must be defined with method(name, function)" + pos
      );
    }

    const methodName = evaluate(methodDef.args[0], scope);
    const methodFunc = evaluate(methodDef.args[1], scope);

    if (typeof methodName !== "string") {
      throw new TypeError("Method name must be a string");
    }
    if (typeof methodFunc !== "function") {
      throw new TypeError("Method must be a function");
    }

    // Wrap method to provide 'this' context
    ClassConstructor.prototype[methodName] = function (...args) {
      return methodFunc(this, ...args);
    };
  });

  // Store in scope
  scope[className] = ClassConstructor;
  return ClassConstructor;
};

/**
 * Sets the evaluate function (used to avoid circular dependency)
 * @param {Function} evaluateFunction - The evaluate function
 */
function setEvaluate(evaluateFunction) {
  evaluate = evaluateFunction;
}

module.exports = { specialForms, setEvaluate };
