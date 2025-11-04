// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// main()
//   .then(() => console.log("✅ Connection successful"))
//   .catch((err) => console.log("❌ Connection error:", err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

//   // Define User Schema
//   const userSchema = new Schema({
//     username: String,
//     email: String,
//   });

//   // Define Post Schema with reference to User
//   const postSchema = new Schema({
//     content: String,
//     likes: Number,
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   });

//   // Create Models
//   const User = mongoose.model("User", userSchema);
//   const Post = mongoose.model("Post", postSchema);

//   // Function to add data
//   const addData = async () => {
//     // Create a new user
//     let user1 = new User({
//       username: "jane_doe",
//       email: "jane_doe@gmail.com",
//     });

//     // Create a new post linked to that user
//     let post1 = new Post({
//       content: "This is my first post!",
//       likes: 10,
//       user: user1._id, // ✅ correct reference
//     });

//     // Save both documents
//     user1 = await user1.save();
//     post1 = await post1.save();

//     console.log("✅ Data added successfully:");
//     console.log("User:", user1);
//     console.log("Post:", post1);
//   };

//   // ✅ Call the function once
//   await addData();

//   // Optional: close connection after saving
//   mongoose.connection.close();
// }


const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("✅ Connection successful"))
  .catch((err) => console.log("❌ Connection error:", err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");

  // Define User Schema
  const userSchema = new Schema({
    username: String,
    email: String,
  });

  // Define Post Schema with reference to User
  const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  });

  // Create Models
  const User = mongoose.model("User", userSchema);
  const Post = mongoose.model("Post", postSchema);

  // Function to add a new post for existing user
  const addSecondPost = async () => {
    // 🔍 Find existing user by username or email
    let existingUser = await User.findOne({ username: "jane_doe" });

    if (!existingUser) {
      console.log("⚠️ User not found! Creating new user...");
      existingUser = new User({
        username: "jane_doe",
        email: "jane_doe@gmail.com",
      });
      existingUser = await existingUser.save();
    }

    // 📝 Create a new post for same user
    const newPost = new Post({
      content: "This is my second post!",
      likes: 20,
      user: existingUser._id,
    });

    // 💾 Save the post
    await newPost.save();

    console.log("✅ Second post added successfully:");
    console.log(newPost);
  };

  await addSecondPost();

  mongoose.connection.close();
}










//to find posts of a user

//cmd mongo shell
// use relationDemo

// const user = db.users.findOne({ username: "jane_doe" });
// db.posts.find({ user: user._id });
