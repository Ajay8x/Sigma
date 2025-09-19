const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

// Connect to MongoDB
main()
  .then(() => console.log('Connection Successful'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log("Connected to MongoDB successfully");

  // Insert chats after connection
  await Chat.insertMany([
    {
      name: "Ajay Singh",
      from: "aj",
      to: "max",
      msg: "Hello, how are you?",
      created_at: new Date(),
    },
    {
      name: "Ajay Singh",
      from: "aj",
      to: "max",
      msg: "I am fine, thanks!",
      created_at: new Date(),
    },
    {
      name: "Ajay Singh",
      from: "aj",
      to: "max",
      msg: "What are you doing?",
      created_at: new Date(),
    },
    {
      name: "Ajay Singh",
      from: "aj",
      to: "max",
      msg: "Let’s meet tomorrow.",
      created_at: new Date(),
    }
  ]);

  console.log(" manny Chats inserted successfully");
}




