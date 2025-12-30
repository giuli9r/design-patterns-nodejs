const { count } = require('console');
const notifier = require('../notifier');

function logStats(user) {
    console.log("Loggins stats.. ", user)
    // write a counter to add to a file
    count('userRegistered');
}

function logPostStats({ user, post }) {
    console.log(`Logging post stats for ${user.name}'s post: ${post.content}`);
    // write a counter to add to a file
    count('postRegistered');
}


notifier.on('userRegistered', logStats);
notifier.on('postRegistered', logPostStats);

module.exports = logStats