const { defaults } = require('figlet');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    image: 
        { type: String, default: 'https://images.unsplash.com/photo-1757664712627-868519088717?...' },
   
    price: Number,
    location: String,
    country: String
});


const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;