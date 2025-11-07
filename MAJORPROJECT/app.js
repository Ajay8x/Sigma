const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError.js');

// Routes
const listings = require('./routes/listing.js');
const reviews = require('./routes/review.js');

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/wanderlust';
main()
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URI);
}

// Middleware
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('home');
  console.log('🏠 Home page rendered successfully');
});

// Listings routes
app.use('/listings', listings);

// ✅ Ensure this matches your review form action
app.use('/listings/:id/reviews', reviews);




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
















