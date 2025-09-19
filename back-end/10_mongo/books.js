const mongoose = require("mongoose");
main()
    .then((res) => console.log("Connection Successful", res))
    .catch((err) => console.log(err));
//connect to the database
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
    console.log("Connected to MongoDB");
}

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: [20 ,"Book title" ]
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
        min: [1, "Price should be at least 1"]
    },
    discount: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        enum: ["fiction", "non-fiction", "science", "biography"],
    },
});

//update book by id
Book.findByIdAndUpdate("68c3fe3623086fbc3e444d64",{price:-4000, discount:-10})
.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});  

//model
const Book = mongoose.model("Book", bookSchema);
// //create a book
// let book = new Book({
//     title: " kite runner",
//     author: "Khaled Hosseini",
//     price: 29.99,
// });
// //save the book to the database
// book.save()
//     .then((res) => {
//         console.log(res);
//     }).catch((err) => {
//         console.log(err);
//     });



