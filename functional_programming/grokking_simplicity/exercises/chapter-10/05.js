// Replace body with Callback

try {
  saveUserData(user);
} catch (error) {
  logToSnapErrors(error);
}

// 1. Identity the before, body, and after sections 

// Before
try {
  // Body
  saveUserData(user);
// After
} catch (error) {
  logToSnapErrors(error);
}

// 2. Extract the whole thing into a function
function withLogging() {
  // Before
  try {
    // Body
    saveUserData(user);
    // After
  } catch (error) {
    logToSnapErrors(error);
  }
}

// 3. Extract body into function passed as argument to the function (that was extracted in the previous step)

function withLogging(f) {
  // Before
  try {
    // Body
    f();
    // After
  } catch (error) {
    logToSnapErrors(error);
  }
}


// Wrapping the code in a function allows us to use first class.
// The code can be saved and we can *defer* running the code until later (when the anonymous function) is called.

withLogging(function() { 
  saveUserData(user);
});

