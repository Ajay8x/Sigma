const express = require('express');
const router = express.Router({ mergeParams: true }); // ✅ Important
const wrapAsync = require('../utils/wrapAsync.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {
    validateReview,
     isLoggedIn,
      isReviewAuthor }
    = require('../middleware.js');


// POST /listings/:id/review
router.post('/', isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).send("Listing not found");

    const newReview = new Review(req.body.review);

    newReview.author = req.user._id; // Assuming you have user authentication
    console.log("Review Author ID:", newReview.author);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash('success', 'Successfully Review created !');
    console.log("✅ New review saved!");
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE Review Route
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully Deleted !');
    console.log(`🗑️ Review ${reviewId} deleted from listing ${id}`);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
