const notifier = require("../notifier");

function postUser(user, message) {
  console.log(`> ${user}, message: ${message}`);
}

notifier.on("user:post", postUser);