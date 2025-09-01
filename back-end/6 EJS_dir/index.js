const express = require('express');
const app = express();
const Path = require('path');
const port = 3000;

app.listen(port, () => {
    console.log(`listening on port  ${port}`);
});




// // static files path set
app.use(express.static(Path.join(__dirname, "/public/js")));
app.use(express.static(Path.join(__dirname, "/public/css")));


app.set('view engine', 'ejs');
// path set views folder
app.set("views", Path.join(__dirname, "/views"));


// views render home page
app.get('/', (req, res) => {
    res.render('home');
});


//dice roll value sending
app.get("/rolldice", (req, res) => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", { diceValue });
});



// instagram username and followers sending
app.get("/i/:username", (req, res) => {
    let { username } = req.params;
    const  instaData  = require('./data.json');
    const data = instaData[username];
    console.log(data);

  if (data) {
        res.render("instagram.ejs", { username, data });  // username + data dono bhejo
    } else {
        res.render("error.ejs", { username });
    }

});

