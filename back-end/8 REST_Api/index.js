// Import necessary modules
const express = require('express');
const app = express();
const port = 3000;
// Path module to handle file paths
const path = require('path');
// to generate unique ids
const { v4: uuidv4 } = require('uuid');
// Method-override to support PUT & patch and DELETE methods in forms
const methodOverride = require('method-override');



// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));


// Use method-override middleware
app.use(methodOverride('_method'));


// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the directory where the template files are located views
app.set('views', path.join(__dirname, 'views'));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));



// Route to render the form
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


// array to store posts

let posts = [
    {
        id: uuidv4(),
        username: "thor",
        content: " i am god of thunder",
    },
    {
        id: uuidv4(),
        username: "tony",
        content: "i am ironman",
    },
    {
        id: uuidv4(),
        username: "doctorStrange",
        content: "i am the master of mystic arts",
    }
];

// Route to display all posts
app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

// route show create  new post
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// Route to handle form submission and create a new post
app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect('/posts');
});

// Route to display a specific post by ID
app.get('/posts/:id', (req, res) => {
    let { id } = req.params;

    // Find post with matching id
    let post = posts.find(p => p.id === id);

    if (post) {
        res.render("show.ejs", { post });
    } else {
        res.send("Post not found!");
    }
});

// Route to show edit form for a specific post
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let { content } = req.body;

    let post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = content;
    console.log(post);
    console.log("updated successfully");
    res.redirect('/posts');
});


app.get('/posts/:id/edit', (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

// Route to delete a specific post by ID
app.delete('/posts/:id', (req, res) => {
    let { id } = req.params;

    // Find the post first
    let deletedPost = posts.find(p => p.id === id);

    // Remove the post from the array
    posts = posts.filter(p => p.id !== id);

    if (deletedPost) {
        console.log("Deleted Successfully");
        console.log(`Deleted by: ${deletedPost.username}`);
    } else {
        console.log("No post found with that ID");
    }

    res.redirect('/posts');
});
