const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs'); 
const Chat = require('./models/chat.js');   
const methodOverride = require("method-override");


// Set up EJS as the templating engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Connect to MongoDB
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  console.log("Connected to MongoDB");
}
main()
  .then(() => console.log('Connection Successful'))
  .catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// // Route to add a chat
// let chat = new Chat({
//     from: "aj",
//     to: "max",
//     msg: "Hello, how are you?",
//     created_at: new Date()
// });

// // save the chat to the database
// chat.save()
//     .then(() => console.log('Chat saved'))
//     .catch(err => console.log(err));

//index route
app.get((('/chats')), async (req, res) => {
    try {
        let chats = await Chat.find();  
        console.log(chats);
      res.render('index.ejs', { chats } );
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }   
});

//new chat route
app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
});

//create chat route
app.post('/chats', async (req, res) => {
    try {
        let { from, to, msg } = req.body; 
        let chat = new Chat({ from, to, msg, created_at: new Date() });
        await chat.save();
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    } 
});

//edit route
app.get('/chats/:id/edit', async (req, res) => {
    try {
        let { id } = req.params;
        let chat = await Chat.findById(id); 
        if (!chat) {
            return res.status(404).send('Chat not found');
        }
        res.render('edit.ejs', { chat });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    } 
});



// update route
app.put('/chats/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let { from, to, msg } = req.body;

        let chat = await Chat.findByIdAndUpdate(
            id,
            { from, to, msg },
            { new: true, runValidators: true }
        );

        if (!chat) {
            return res.status(404).send('Chat not found');
        }

        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


//delete route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});