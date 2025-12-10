const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: '123456'
};

let authToken = '';

// Test functions
const testServerConnection = async () => {
  try {
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', response.data.message);
  } catch (error) {
    console.log('❌ Server connection failed:', error.message);
  }
};

const testUserRegistration = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, testUser);
    console.log('✅ User registration successful:', response.data.name);
    return response.data.token;
  } catch (error) {
    console.log('❌ User registration failed:', error.response?.data?.message || error.message);
    return null;
  }
};

const testUserLogin = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User login successful:', response.data.name);
    return response.data.token;
  } catch (error) {
    console.log('❌ User login failed:', error.response?.data?.message || error.message);
    return null;
  }
};

const testGetProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    console.log('✅ Get products successful:', `${response.data.products.length} products found`);
  } catch (error) {
    console.log('❌ Get products failed:', error.response?.data?.message || error.message);
  }
};

const testGetProductById = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    if (response.data.products.length > 0) {
      const productId = response.data.products[0]._id;
      const productResponse = await axios.get(`${API_BASE_URL}/products/${productId}`);
      console.log('✅ Get product by ID successful:', productResponse.data.name);
    } else {
      console.log('⚠️  No products available to test');
    }
  } catch (error) {
    console.log('❌ Get product by ID failed:', error.response?.data?.message || error.message);
  }
};

const testProtectedRoute = async (token) => {
  if (!token) {
    console.log('⚠️  No token available for protected route test');
    return;
  }
  
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Protected route test successful:', response.data.name);
  } catch (error) {
    console.log('❌ Protected route test failed:', error.response?.data?.message || error.message);
  }
};

// Run all tests
const runTests = async () => {
  console.log('🚀 Starting API Tests...\n');
  
  await testServerConnection();
  console.log('');
  
  await testGetProducts();
  console.log('');
  
  await testGetProductById();
  console.log('');
  
  const token = await testUserRegistration();
  console.log('');
  
  if (!token) {
    await testUserLogin();
    console.log('');
  } else {
    authToken = token;
  }
  
  await testProtectedRoute(authToken);
  console.log('');
  
  console.log('🏁 API Tests completed!');
};

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };
