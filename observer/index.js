require ('./listener/emailListener');
require ('./listener/stastListener'); 

const registerUser = require('./userRegistration');
const postRegistration = require('./postRegistration');

const user1 = {id: 1, email: "user1@gmail.com", name: "User One"};
const user2 = {id: 2, email: "user2@gmail.com", name: "User Two"};

const post1 = {id: 1, content: "This is my first post!"};
const post2 = {id: 2, content: "Hello world!"};

registerUser(user1);
registerUser(user2);

postRegistration(user1, post1);
postRegistration(user2, post2);
postRegistration(user1, post2);