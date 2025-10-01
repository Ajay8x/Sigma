const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Chat = require('./models/chat.js');
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

// ----------------------
//  Utility
// ----------------------
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

// ----------------------
//  EJS & Middleware Setup
// ----------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ----------------------
//  MongoDB Connection
// ----------------------
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log("Connected to MongoDB");
}
main()
  .then(() => console.log('Connection Successful'))
  .catch(err => console.log(err));

// ----------------------
//  Root Route
// ----------------------
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ----------------------
//  Chat Routes
// ----------------------

// Index Route
app.get("/chats", asyncWrap(async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
}));

// New Chat Form
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// Create Chat
app.post("/chats", asyncWrap(async (req, res) => {
  let { from, to, msg } = req.body;
  let chat = new Chat({ from, to, msg, created_at: new Date() });
  await chat.save();
  res.redirect("/chats");
}));

// Show Single Chat
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) throw new ExpressError(404, "Chat not found");
  res.render("show.ejs", { chat });
}));

// Edit Chat Form
app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  if (!chat) throw new ExpressError(404, "Chat not found");
  res.render("edit.ejs", { chat });
}));

// Update Chat
app.put("/chats/:id", asyncWrap(async (req, res, next) => {
  let { id } = req.params;
  let { from, to, msg } = req.body;
  let chat = await Chat.findByIdAndUpdate(
    id,
    { from, to, msg },
    { new: true, runValidators: true }
  );
  if (!chat) throw new ExpressError(404, "Chat not found");
  res.redirect("/chats");
}));

// Delete Chat
app.delete("/chats/:id", asyncWrap(async (req, res) => {
  let { id } = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
}));







// ----------------------
//  404 & Error Handlers

app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});



const handleValidationErr = (err) => {
  console.log("This was a Validation error. Please follow rules");
  console.dir(err);
  return err;
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name == "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});





//  Server Start
// ----------------------
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
