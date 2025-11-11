const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner } = require('../middleware.js');
const { validateListing } = require('../middleware.js');











// All Listings
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { listings: allListings });
    console.log("All listings page rendered successfully");
}));


// New Listing Form
router.get('/new', isLoggedIn, (req, res) => {
    res.render('listings/new.ejs');
    console.log("New listing form rendered successfully");
});


// Show Listing by ID (with populated reviews)
router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate('reviews').populate('owner');

    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings'); // ✅ Use redirect and return
    }
    res.render('listings/show.ejs', { listing });
    console.log(listing);
    console.log("✅ Listing details page rendered successfully (with populated reviews)");

}));




// Create Listing
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Successfully created a new listing!');
    res.redirect(`/listings/${newListing._id}`);
    console.log("New listing created successfully");
}));








// Edit Form
router.get('/:id/edit', isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash('error', 'Listing not found');
        return res.redirect('/listings'); // ✅ Use redirect and return
    }
    res.render('listings/edit.ejs', { listing });
    console.log("Edit page rendered successfully");
}));


// Update Listing
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id,req.body.listing,
        { new: true, runValidators: true }
    );
    if (!updatedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }

    req.flash('success', 'Successfully Listing updated !');
    res.redirect(`/listings/${updatedListing._id}`);
    console.log("Listing updated successfully");
}));

// Delete Listing
router.delete('/:id', isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError(404, "Listing Not Found");
    }
    req.flash('success', 'Successfully  listing Deleted!');
    res.redirect('/listings');
    console.log("Listing deleted successfully");
}));



module.exports = router;