const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/artisans-corner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@artisanscorner.com',
    password: '123456',
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    isAdmin: false,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456',
    isAdmin: false,
  },
];

const sampleProducts = [
  {
    name: 'Handmade Ceramic Mug',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    category: 'Ceramics',
    description: 'Beautiful handcrafted ceramic mug with unique glaze patterns. Perfect for your morning chai or coffee.',
    price: 299,
    countInStock: 15,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'Wooden Cutting Board',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500',
    category: 'Woodworking',
    description: 'Premium hardwood cutting board made from sustainable teak wood. Perfect for Indian cooking.',
    price: 899,
    countInStock: 8,
    rating: 4.8,
    numReviews: 8,
  },
  {
    name: 'Handwoven Cotton Scarf',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500',
    category: 'Textiles',
    description: 'Soft, handwoven cotton scarf in vibrant Indian colors. Made using traditional weaving techniques.',
    price: 599,
    countInStock: 20,
    rating: 4.2,
    numReviews: 15,
  },
  {
    name: 'Glass Vase',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500',
    category: 'Glass',
    description: 'Hand-blown glass vase with elegant curves. Perfect for displaying fresh flowers.',
    price: 1299,
    countInStock: 5,
    rating: 4.7,
    numReviews: 6,
  },
  {
    name: 'Leather Wallet',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Leather',
    description: 'Hand-stitched leather wallet made from premium full-grain leather. Durable and stylish.',
    price: 799,
    countInStock: 12,
    rating: 4.6,
    numReviews: 10,
  },
];

const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 1. Create users
    // Note: We use User.create() so the password hashing middleware runs!
    const createdUsers = await User.create(sampleUsers);
    const adminUser = createdUsers[0]._id;
    const regularUser = createdUsers[1]._id;

    // 2. Add admin user to products
    const sampleProductsWithUser = sampleProducts.map((product) => {
      return { ...product, user: adminUser };
    });

    const createdProducts = await Product.insertMany(sampleProductsWithUser);
    
    // 3. Create a Sample Order
    const sampleOrder = {
      user: regularUser,
      orderItems: [
        {
          name: createdProducts[0].name,
          qty: 2,
          image: createdProducts[0].image,
          price: createdProducts[0].price,
          product: createdProducts[0]._id,
        },
        {
          name: createdProducts[2].name,
          qty: 1,
          image: createdProducts[2].image,
          price: createdProducts[2].price,
          product: createdProducts[2]._id,
        }
      ],
      shippingAddress: {
        address: '123 Main St',
        city: 'Chandigarh',
        postalCode: '160001',
        country: 'India',
      },
      paymentMethod: 'Razorpay',
      paymentResult: {
        id: 'pay_sample123',
        status: 'completed',
        update_time: Date.now(),
        email_address: 'john@example.com',
      },
      itemsPrice: 1197,
      taxPrice: 100,
      shippingPrice: 0,
      totalPrice: 1297,
      isPaid: true,
      paidAt: Date.now(),
      isDelivered: false,
    };

    await Order.create(sampleOrder);

    console.log('Data (Users, Products, and Sample Order) imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}