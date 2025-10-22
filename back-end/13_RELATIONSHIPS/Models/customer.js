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
    const orderSchema = new Schema({
        item: String,
        price: Number,
    });


    const customerSchema = new Schema({
        name: String,
        orders: [
            { type: Schema.Types.ObjectId, ref: 'Order' },

        ]


  // Create model
  const Order = mongoose.model('Order', orderSchema);

        // Add orders
        //   const addOrders = async () => {
        //     const orders = [
        //       { item: 'samosa', price: 10 },
        //       { item: 'egg', price: 140 },
        //       { item: 'chips', price: 41 },
        //     ];

        //     const result = await Order.insertMany(orders);
        //     console.log('✅ Orders added:', result);
        //   };

        //   // Call function
        //   await addOrders();
    } 