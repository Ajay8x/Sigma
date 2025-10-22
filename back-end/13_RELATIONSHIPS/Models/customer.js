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
    ],
  });

  // Create model
  const Order = mongoose.model('Order', orderSchema);
  const Customer = mongoose.model('Customer', customerSchema);

  const addCustomer = async () => {
    // Fetch existing orders or create them
    // let order1 = await Order.findOne({ item: 'samosa' });
    // let order2 = await Order.findOne({ item: 'egg' });

    // if (!order1 || !order2) {
    //   console.log('⚠️ Orders not found! Please insert "samosa" and "egg" orders first.');
    //   return;
    // }

    // const customer = new Customer({
    //   name: 'John Doe',
    // });

    // customer.orders.push(order1._id);
    // customer.orders.push(order2._id);

    // const result = await customer.save();
    // console.log('✅ Customer added:', result);

    let result=await Customer.find({}).populate('orders');
    console.log('✅ Customers found:', result[0]);
  };

  await addCustomer();
}


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
        