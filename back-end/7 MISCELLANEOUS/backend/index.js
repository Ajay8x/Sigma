const express = require('express');
const app = express();
const port = 3000;

//parse the incoming requests post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.get("/register", (req, res) => {
    let {user, password} = req.query;

res.send(`Welcome! get request ${user} your password is ${password}`);

});


app.post("/register", (req, res) => {
    let {user, password} = req.body;
    console.log(req.body);
  res.send('Hello World! post request');
});













app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
