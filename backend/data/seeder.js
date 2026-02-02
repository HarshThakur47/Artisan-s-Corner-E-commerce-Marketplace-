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

    // Create users
    const createdUsers = await User.create(sampleUsers);
    const adminUser = createdUsers[0]._id;

    // Add admin user to products
    const sampleProductsWithUser = sampleProducts.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProductsWithUser);

    console.log('Data imported successfully');
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
