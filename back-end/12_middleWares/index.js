const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");


// Logger middleware
app.use((req, res, next) => {
    req.responseTime = new Date(Date.now()).toString();
    console.log(req.method, req.path, req.responseTime, req.hostname);
    next();
});

// Token checker middleware
const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveaccess") {
        return next();
    }
    return res.status(401).send("Unauthorized Access denied");
};

// Protected route
app.get("/api", checkToken, (req, res) => {
    res.send("Welcome! You have access to the API.");
});

// Middleware only for /random
app.use("/random", (req, res, next) => {
    console.log("Hi, I am only for /random");
    next();
});

app.get("/", (req, res) => {
    res.send("Hi, I am root.");
});

app.get("/err", (req, res) => {
    ascd == asdf
});

app.get("/admin", (req, res) => {
    throw new ExpressError(403, "access to admin is forbidden!");
});



// Validation route
app.get("/greet", (req, res) => {
    if (!req.query.name) {
        return res.status(400).send("Please provide a name");
    }
    res.send(`Hello, ${req.query.name}`);
});

// Error logging middleware
app.use((err, req, res, next) => {
    console.log("-------- ERROR --------");
    next(err);
});

app.use((err, req, res, next) => {
    console.log("-------- ERROR2 Middleware --------");
    next(err);
});

// Final error handler
app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong!" } = err;

    res.status(status).send(message);
});

// 404 handler
app.use((req, res) => {
    res.status(404).send("404 Not Found!");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
