const notifier = require('../notifier');

function postMessage({ user, post }) {
    console.log(`New post registered by ${user.name}: ${post.content}`);
    console.log(`${post.content} has one new like!`);
    // Implement code to handle the new post (e.g., notify followers)
}

notifier.on('postRegistered', postMessage);
