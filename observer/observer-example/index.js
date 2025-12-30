
require ("./listeners/emailListener");
require ("./listeners/statsListener.js");
require ("./listeners/postListener.js");

const registerUser = require ("./userRegistration");
const registerPost = require ("./userPost");

const user1 = { id: 1, email: "user@example.com", name: "John Doe" };
const user2 = { id: 2, email: "user2@example.com", name: "Jane Doe" };

registerUser(user1);
registerUser(user2);

const posts = [
  {
    id: 1,
    text: "Hola John Como estas?",
    user: user2,
  },
  {
    id: 2,
    text: "Hola Jane, bien y tu?",
    user: user1,
  },
  {
    id: 3,
    text: "Que bueno John, Me alegro mucho!, yo estoy muy bien",
    user: user2,
    email: user2.email,
  },
  {
    id: 4,
    text: "Me alegro mucho Jane que estés bien",
    user: user1,
  },
];

for (const post of posts) {
  registerPost(post.user.email, post.text);
}