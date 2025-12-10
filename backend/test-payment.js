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

const testCreatePaymentOrder = async (token) => {
  if (!token) {
    console.log('⚠️  No token available for payment test');
    return;
  }
  
  try {
    const response = await axios.post(`${API_BASE_URL}/payment/create-order`, {
      amount: 299,
      currency: 'INR'
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Payment order created successfully');
    console.log(`   Order ID: ${response.data.orderId}`);
    console.log(`   Amount: ₹${response.data.amount / 100}`);
    console.log(`   Currency: ${response.data.currency}`);
    
    return response.data;
  } catch (error) {
    console.log('❌ Payment order creation failed:', error.response?.data?.message || error.message);
    return null;
  }
};

const testPaymentVerification = async (token) => {
  if (!token) {
    console.log('⚠️  No token available for payment verification test');
    return;
  }
  
  try {
    // This is a mock verification - in real scenario, you'd get these from Razorpay
    const mockVerificationData = {
      razorpay_order_id: 'order_test123',
      razorpay_payment_id: 'pay_test123',
      razorpay_signature: 'mock_signature'
    };
    
    const response = await axios.post(`${API_BASE_URL}/payment/verify`, mockVerificationData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log('✅ Payment verification endpoint accessible');
    console.log('   Note: This is a mock test - real verification requires actual payment data');
    
  } catch (error) {
    console.log('❌ Payment verification failed:', error.response?.data?.message || error.message);
  }
};

// Run all tests
const runPaymentTests = async () => {
  console.log('🚀 Starting Payment Integration Tests...\n');
  
  const token = await testUserLogin();
  console.log('');
  
  if (token) {
    authToken = token;
    await testCreatePaymentOrder(authToken);
    console.log('');
    await testPaymentVerification(authToken);
  }
  
  console.log('\n🏁 Payment Tests completed!');
  console.log('\n📝 Next Steps:');
  console.log('1. Set up Razorpay account at razorpay.com');
  console.log('2. Add your Razorpay keys to .env file');
  console.log('3. Test with real payment integration');
};

// Run tests if this file is executed directly
if (require.main === module) {
  runPaymentTests().catch(console.error);
}

module.exports = { runPaymentTests };
