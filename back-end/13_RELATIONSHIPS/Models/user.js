const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/relationDemo';

// Connect to MongoDB
main()
  .then(() => console.log('✅ Connected successfully to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

async function main() {
  await mongoose.connect(MONGO_URI);

  // Define schema
  const userSchema = new Schema({
    username: String,
    addresses: [
      { _id: false,      
        location: String,
        city: String,
      },
    ],
  });

  // Create model
  const User = mongoose.model('User', userSchema);

  // Add a new user
  const addUser = async () => {
    const user1 = new User({
      username: 'john_doe',
      addresses: [
        { location: '123 Main St', city: 'New York' },
      ],
    });

    // Add another address
    user1.addresses.push({ location: '456 Elm St', city: 'Los Angeles' });

    await user1.save();
    console.log('✅ User added:', user1);
  };

  // Call the function here (inside main)
  await addUser();
}
