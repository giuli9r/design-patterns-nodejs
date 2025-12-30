const notifier = require('./notifier');

function postRegistration(user, post) {
    console.log('Post-registration process for user:', user.name);
    console.log('Post content:', post.content);
    // Implement code for post-registration actions (e.g., send welcome email)
    notifier.emit('postRegistered', { user, post });
    return post;
}

module.exports = postRegistration;