// Week 1 exercise generated Claude Sonnet
// Classify each of these as action or calculation and explain why
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
// calculation: 
// - There aren't any side-effects. It only uses the arguments passed to it. It doesn't writ to any other state.
// - It would return the same output when given the same inputs no matter when we run it or how many times it is run.

function saveUser(user) {
  database.save(user);
} 
// action: 

// - there's a side-effct. It's using `database` which isn't an argument, so
// that's being used from global state/context. 

// - `database.save` would be writing to external storage. That is a side-effect.

//    - it depends on when it is run (different id, different insertion point,
//    transaction may block other db calls, other things can see the user was
//    updated)

//    - it changes if we run it more than once. it creates mutiple requests to
//    the db, changes the user record multiple times etc (for example last
//    modified timestaps would change).


function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

// action:
// - the result changes depending on when it has been run

function validateEmail(email) {
  return email.includes('@');
}
// calculation:
// - the result is the same when given the same input
// - no side-effects: it can be run many times.

function logUserActivity(userId, activity) {
  console.log(`User ${userId} performed ${activity}`);
  analyticsService.track(userId, activity);
}

// action
// - it has side effects: modifies the console, updates the analytics, presumably sends a request.
// - it depends on when it's run and how many times
//    - writing to the console is different if done many times
//    - as is sending multiple updates to the analytics service: that would change the data reported (very likely incorrectly)
