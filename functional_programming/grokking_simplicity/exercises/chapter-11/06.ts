const logToSnapErrors = (error: unknown) => console.debug(error);

try {
  saveUserData(user);
} catch (e) {
  logToSnapErrors(error);
}

try {
  fetchProduct(productId);
} catch (error) {
  logToSnapErrors(error);
}

const saveUserDataNoLogging = (user: any) => {};

// renamed the functions so it's clear they don't any logging within
// the function
try {
  saveUserDataNoLogging(user);
}
catch (error) {
  logToSnapErrors(error);
}


// wrap in a function that does the logging

function saveUserDataWithLogging(user) {
  try {
    saveUserDataNoLogging(user);
  }
  catch (error) {
    logToSnapErrors(error);
  }
}


// remember: the code with came up with last chapter
function withLogging(f: () => void) {
  try {
    f();
  } catch (error) {
    logToSnapErrors(error);
  }
}

// try-catch statements are encapsulated in this function
// but we still have to repeatedly call (duplicate) `withLogging` where
// ever we would need to handle the exceptions:
withLogging(function() {
  saveUserData(user);
})

// Instead... we can return the function that wraps the original function
// rather than calling it

function wrapLogging(f: (arg: unknown) => unknown) {
  return function(arg: unknown) {
    try {
      f(arg);
    } catch (error) {
      logToSnapErrors(error);
    }
  }
}

const saveUserDataWithLogging = wrapLogging(saveUserDataNoLogging);
const fetchProductWithLogging = wrapLogging(fetchProductNoLogging);

// This higher-order function [factory] takes one argument.
// Variadic arguments could be handleded using the rest and 
// spread mechanics in ES6

// pg 285 - wrap functions to ignore errors


try {
  codeThatMightThrow();
} catch (error) {
  // ignore errors by doing nothing
}

function wrapIgnoreErrors(f: (...args) => unknown): (...args) => unknown | null {
  return function (...args) {
    // in the function definition, the ... (rest) operator collects
    // all arguments into an array named `args`
    try {
      // in the function call, the ... (spread) operator expands the
      // array named `args` to individual arguments (like using `.apply`)
      return f(...args);
    } catch (error) {
      return null;
    }
  }
}

const codeWithIgnoredError = wrapIgnoreErrors(codeThatMightThrow);
codeWithIgnoredError(a, b, c);
