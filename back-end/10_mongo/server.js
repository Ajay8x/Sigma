const mongoose = require("mongoose");
main ()
.then((res) => console.log("Connection Successful", res))
.catch((err) => console.log(err));
//connect to the database
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");        
    console.log("Connected to MongoDB"); 
}    
//schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,

});
//model
const User = mongoose.model("User", userSchema);

//update user
User.updateOne({name:"John Doe1"},{age:60})
.then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});












// //find one user
// User.findOne({age:{$gt:30}})
// .then((res)=>{
//     console.log(res[0].name);
// }).catch((err)=>{
//     console.log(err);
// });



// //insert multiple users

// User.insertMany([
//   { name: "John Doe1", email: "aj@m.com", age: 25 },
//   { name: "hon das2", email: " asd@gmail.com", age: 35 },
//   { name: "on Doe3", email: "on@gmail.com", age: 45 },   
// ])
// .then((res) => {
//     console.log(res);   
// })
// .catch((err) => {
//     console.log(err);   
// });    









// //create a new user

// const user2 = new User({
//   name: "Qohn Doe",
//   email: "qqq@gmail.com",
//   age: 45,
// });

// //save the user to the database
// user2
// .save()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);   
// });

