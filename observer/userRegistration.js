const notifier = require('./notifier');

function registerUser(user) { 
    console.log('Register user...', user.name);
    // Implement code to register the user (e.g., save to database)
    notifier.emit('userRegistered', user);
    return user;
}

module.exports = registerUser;

// export function registerUser(user) {
//     console.log(`Registering user: ${user.name} with email: ${user.email}`);
//     // Your registration logic here
//   }