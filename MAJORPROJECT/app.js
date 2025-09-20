// Importing necessary modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/wanderlust';
main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URI);
}

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
