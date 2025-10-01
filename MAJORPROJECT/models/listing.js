const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "No description provided",
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    set: (v) => (v === "" ? "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" : v),
  },
  price: {
    type: Number,
    min: [0, "Price cannot be negative"],
    default: 0,
  },
  location: {
    type: String,
    trim: true,
    default: "Unknown location",
  },
  country: {
    type: String,
    trim: true,
    default: "Unknown country",
  },
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
