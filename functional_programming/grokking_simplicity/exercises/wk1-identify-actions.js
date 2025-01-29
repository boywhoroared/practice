// Week 1 exercise generated Claude Sonnet
// Classify each of these as action or calculation and explain why
function getFullName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}

function saveUser(user) {
  database.save(user);
}

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

function validateEmail(email) {
  return email.includes('@');
}

function logUserActivity(userId, activity) {
  console.log(`User ${userId} performed ${activity}`);
  analyticsService.track(userId, activity);
}
