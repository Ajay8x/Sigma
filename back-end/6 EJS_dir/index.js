const express = require('express');
const app = express();
const Path = require('path');
const port = 3000;



app.listen(port, () => {
    console.log(`listening on port  ${port}`);
});



app.set('view engine', 'ejs');
// path set views folder
app.set("views",Path.join(__dirname,"/views"));



app.get('/', (req, res) => {
    res.render('home');
});

//rolling a dice
app.get("/rolldice", (req, res) => {
    res.render('rolldice');
});



