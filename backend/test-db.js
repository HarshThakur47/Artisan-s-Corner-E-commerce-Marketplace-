const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('🔍 Testing MongoDB Connection...\n');

// Get the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artisans-corner';

console.log('📋 Connection Details:');
console.log(`- URI: ${mongoURI.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials
console.log(`- Environment: ${process.env.NODE_ENV || 'development'}`);
console.log('');

// Test connection
async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 Port: ${mongoose.connection.port}`);
    
    // Test if we can perform basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    
    if (collections.length > 0) {
      console.log('📋 Collections:');
      collections.forEach(collection => {
        console.log(`  - ${collection.name}`);
      });
    }
    
    await mongoose.disconnect();
    console.log('\n✅ Database test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error(`Error: ${error.message}`);
    
    // Provide helpful troubleshooting tips
    console.log('\n🔧 Troubleshooting Tips:');
    
    if (error.message.includes('authentication failed')) {
      console.log('1. Check your MongoDB credentials (username/password)');
      console.log('2. If using MongoDB Atlas, verify your connection string');
      console.log('3. Make sure your IP is whitelisted in MongoDB Atlas');
      console.log('4. Verify the database name in your connection string');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('1. Make sure MongoDB is running locally');
      console.log('2. Check if MongoDB is installed and started');
      console.log('3. Verify the port number (default: 27017)');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('1. Check your internet connection');
      console.log('2. Verify the MongoDB Atlas cluster URL');
      console.log('3. Make sure the cluster is active');
    }
    
    console.log('\n📝 Next Steps:');
    console.log('1. Copy config.env to .env');
    console.log('2. Update the MONGODB_URI with your actual connection string');
    console.log('3. Run this test again: node test-db.js');
  }
}

// Run the test
testConnection();
