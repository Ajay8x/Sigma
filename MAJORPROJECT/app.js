// Importing necessary modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require('./schema.js');


// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/wanderlust';
main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URI);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(methodOverride('_method'));
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));








// Routes
app.get("/", (req, res) => {
    res.render("home");   // 
    console.log("Home page rendered successfully");
});

// Validation Middleware

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};




// All Listings
app.get('/listings', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { listings: allListings });
    console.log("All listings page rendered successfully");
}));

// New Listing Form
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
    console.log("New listing form rendered successfully");
});



// Show Listing by ID
app.get('/listings/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render('listings/show.ejs', { listing });
    console.log("Listing details page rendered successfully");
}));




// Create Listing
app.post('/listings', validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
    console.log("New listing created successfully");
}));






// Edit Form
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render('listings/edit.ejs', { listing });
    console.log("Edit page rendered successfully");
}));

// Update Listing
app.put('/listings/:id', validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        { new: true, runValidators: true }
    );
    if (!updatedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.redirect(`/listings/${updatedListing._id}`);
    console.log("Listing updated successfully");
}));

// Delete Listing
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.redirect('/listings');
    console.log("Listing deleted successfully");
}));




///// error handling /////

// 404 handler
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Favicon route to prevent unnecessary 404 errors

// app.get('/favicon.ico', (req, res) => res.status(204).end());






// General error handler    
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    //    res.status(statusCode).send(message);
    res.render("error.ejs", { err });
    console.error(err);
});











// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
















