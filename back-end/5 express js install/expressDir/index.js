const express = require("express");
const app = express();

let port = 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});







// // GET routes
// app.get("/", (req, res) => {
//     res.send(" are you connected root path");
// });

// app.get("/help", (req, res) => {
//     res.send("You connected help path");
// });

// app.get("/login", (req, res) => {
//     res.send("You connected login path");
// });

// app.get("/user", (req, res) => {
//     res.send("You connected user path");
// });

// // POST route
// app.post("/", (req, res) => {
//     res.send("You sent POST request to root");
// });

// // Example HTML response
// app.get("/fruits", (req, res) => {
//     let code = `
//         <h1>Fruits</h1>
//         <ul>
//             <li>apple</li>
//             <li>banana</li>
//             <li>orange</li>
//         </ul>
//     `;
//     res.send(code);
// });

// // Catch-all for undefined routes
// app.use((req, res) => {
//     res.send("This path does not exist");
// });



///////////////////////////////////////////////////////////////////////////





// //path patrameters
// app.use("/:username/:id", (req, res) => {
//     // let username = req.params.username;
//     // let id = req.params.id; 


//     //variable
//     let { username, id } = req.params;
//     console.log(req.params);
//     res.send(`welcome You are visiting ${req.params.username} ${req.params.id}  page`);
// });




// path parameter example
app.get("/:username/:id", (req, res) => {
    let { username, id } = req.params;

    let htmlStr = `Welcome to the page of @${username}, your ID is ${id}`;
    console.log(req.params);

    res.send(htmlStr);
});

// query parameter example
app.get("/search", (req, res) => {
    let { q } = req.query;   // destructure first
    if (!q) {
        res.send("No search query provided");
        return;
    }
    console.log(req.query);
    res.send(`<h1>You searched for ${q}</h1>`);
});
