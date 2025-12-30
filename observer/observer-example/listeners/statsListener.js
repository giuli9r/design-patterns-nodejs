const notifier = require("../notifier");

function logStats(user) {
  console.log(`Logging stats...`, user);
}

notifier.on("user:created", logStats);

module.exports = logStats;