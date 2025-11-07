const express = require('express');
const router = express.Router({ mergeParams: true }); // ✅ Important
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const { reviewSchema } = require('../schema.js');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');

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

// POST /listings/:id/review
router.post('/', validateReview, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).send("Listing not found");

    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("✅ New review saved!");
    res.redirect(`/listings/${listing._id}`);
}));

// DELETE Review Route
router.delete('/:reviewId', wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document
    await Review.findByIdAndDelete(reviewId);

    console.log(`🗑️ Review ${reviewId} deleted from listing ${id}`);
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
