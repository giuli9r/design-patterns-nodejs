const notifier = require("./notifier");

function postUser(user, message) {
  console.log("__________");

  notifier.emit("user:post", user, message);

  return { user, message };
}

module.exports = postUser;