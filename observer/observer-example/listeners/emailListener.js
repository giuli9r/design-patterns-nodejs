const notifier = require("../notifier");

function sendEmail(user) {
  console.log(`Sending email to ${user.email}`);
}

notifier.on("user:created", sendEmail);

module.exports = sendEmail;