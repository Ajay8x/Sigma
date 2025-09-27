// Importing necessary modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');


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
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, 'public')));






// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});





// Routes
app.get("/", (req, res) => {
  res.render("home");   // 
    console.log("Home page rendered successfully");
});




app.get('/listings', async (req, res) => {
    try {
        const allListings = await Listing.find({});

        res.render("listings/index.ejs", { listings: allListings });
        console.log("All listings page rendered successfully");
     
    } catch (err) {
        console.error("Error retrieving listings:", err);
        res.status(500).send("Error retrieving listings");
    }
});



//New Listing Route
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs');
    console.log("New listing form rendered successfully");
});






app.get('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).render('404.ejs'); // Render a dedicated 404 page
        }
        res.render('listings/show.ejs', { listing });
        console.log("Listing details page rendered successfully");
    } catch (err) {
        console.error(err); // Use console.error for logging errors
        res.status(500).send("list Internal Server Error");
    }
});




//Create Listing Route
app.post('/listings', async (req, res) => { 
    try {    const newListing = new Listing (req.body.listing);

      await newListing.save();
        res.redirect(`/listings/${newListing._id}`);
        console.log("New listing created successfully");
   
    }       catch (err) {   
        console.error(err);

        res.status(500).send(" new create Internal Server Error",err);
    }
});



//edit route
app.get('/listings/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        res.render('listings/edit.ejs', { listing });
        console.log("Edit page rendered successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("edit Internal Server Error");
        
    }
});

//update route
app.put('/listings/:id', async (req, res) => {
    try {
        const { id } = req.params;
      const updatedListing = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
        res.redirect(`/listings/${updatedListing._id}`);
        console.log("Listing updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }   
});


//delete route
app.delete('/listings/:id', async (req, res) => {
    try {       
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        res.redirect('/listings');
        console.log("Listing deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("delete Internal Server Error");
    }   
});







































// app.get(`/testListing`, async (req, res) => {

// let sampleListing = new Listing({
//     title: "my new home ",
//     description: "a beautiful place to live",
//     Image: "",
//     price: 1000,
//     location: "New York",
//     country: "USA"


// });
// await sampleListing.save();
// console.log("Listing saved:", sampleListing);
// res.send("Listing created and saved to database");
// });