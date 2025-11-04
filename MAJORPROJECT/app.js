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
const { listingSchema,reviewSchema } = require('./schema.js');
const review = require('./models/review.js');

const listing=require('./routes/listing.js');


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





// Review Validation Middleware
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};





app.use('/listings', listing);






//POST review route
app.post('/listings/:id/review', validateReview,wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) return res.status(404).send("Listing not found");

  let newReview = new review(req.body.review);
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  console.log("✅ New review saved!");

  
  res.redirect(`/listings/${listing._id}`);
}));




// DELETE Review Route
app.delete('/listings/:id/reviews/:reviewId', wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;

  // Remove review reference from the listing
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // Delete the review document
  await review.findByIdAndDelete(reviewId);

  console.log(`🗑️ Review ${reviewId} deleted from listing ${id}`);
  res.redirect(`/listings/${id}`);
}));







///// ERROR HANDLING /////

// 404 handler (for unmatched routes) / global handler
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found'));
});

// General error handler
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong!';

  // ✅ Set correct status
  res.status(statusCode);

  // For JSON requests (like Postman/Hoppscotch)
  if (req.headers.accept?.includes('application/json')) {
    return res.json({ error: err.message, statusCode });
  }

  // Otherwise, render EJS error page
  res.render('error.ejs', { err });

  console.error(`⚠️ Error (${statusCode}): ${err.message}`);
});








        // Start the server
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
















