const express=require('express');
const router=express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { listingSchema,reviewSchema } = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');



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
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { listings: allListings });
    console.log("All listings page rendered successfully");
}));



// New Listing Form
router.get('/new', (req, res) => {
    res.render('listings/new.ejs');
    console.log("New listing form rendered successfully");
});



// Show Listing by ID ////    with  (Populate Reviews)
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;

    // Populate reviews so we get full review data, not just ObjectIds
    const listing = await Listing.findById(id)
        .populate('reviews'); // <— this line is the key

    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }

    res.render('listings/show.ejs', { listing });
    console.log("✅ Listing details page rendered successfully (with populated reviews)");
}));




// Create Listing
router.post('/', validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
    console.log("New listing created successfully");
}));








// Edit Form
router.get('/:id/edit', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.render('listings/edit.ejs', { listing });
    console.log("Edit page rendered successfully");
}));

// Update Listing
router.put('/:id', validateListing, wrapAsync(async (req, res) => {
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
router.delete('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    res.redirect('/listings');
    console.log("Listing deleted successfully");
}));


module.exports=router;