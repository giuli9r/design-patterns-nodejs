const notifier = require("./notifier");

function registerUser(user) {
  console.log("Registering user...");

  notifier.emit("user:created", user);

  return user;
}

module.exports = registerUser;