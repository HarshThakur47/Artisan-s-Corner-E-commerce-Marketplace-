# 🚀 Quick Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas account)

## Step 1: Environment Configuration

1. **Copy the configuration file:**
   ```bash
   copy config.env .env
   ```

2. **Edit `.env` file with your settings:**
   - For **local MongoDB**: Use `mongodb://localhost:27017/artisans-corner`
   - For **MongoDB Atlas**: Replace with your connection string
   - Generate a secure JWT secret
   - Add your Cloudinary and Razorpay keys (optional for basic testing)

## Step 2: Database Setup

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Test connection: `npm run test:db`

### Option B: MongoDB Atlas (Recommended)
1. Create free account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `.env` with your connection string
5. Test connection: `npm run test:db`

## Step 3: Install Dependencies
```bash
npm install
```

## Step 4: Test Database Connection
```bash
npm run test:db
```

## Step 5: Import Sample Data
```bash
npm run data:import
```

## Step 6: Start the Server
```bash
npm run dev
```

## Step 7: Test the API
```bash
npm run test:api
```

## Step 8: Razorpay Setup (Optional - for payments)

### Why Razorpay?
- **Free for Indian businesses** - No setup fees, no monthly charges
- **Supports all Indian payment methods** - UPI, cards, net banking, wallets
- **Easy integration** - Simple API and excellent documentation
- **Trusted by millions** - Used by major Indian businesses

### Setup Steps:
1. **Create Razorpay Account:**
   - Go to [razorpay.com](https://razorpay.com)
   - Sign up for a free account
   - Complete KYC (required for Indian businesses)

2. **Get API Keys:**
   - Go to Settings → API Keys
   - Copy your Key ID and Key Secret
   - Add them to your `.env` file

3. **Test Mode:**
   - Use test mode for development
   - Test cards: 4111 1111 1111 1111
   - Test UPI: success@razorpay

4. **Webhook Setup (Optional):**
   - Add webhook URL: `https://yourdomain.com/api/payment/webhook`
   - Events: `payment.captured`, `payment.failed`

### Payment Flow:
1. Create order: `POST /api/payment/create-order`
2. Process payment on frontend using Razorpay SDK
3. Verify payment: `POST /api/payment/verify`
4. Update order status in database

## Troubleshooting

### MongoDB Connection Issues
- **Authentication failed**: Check credentials and IP whitelist
- **Connection refused**: Make sure MongoDB is running
- **Network error**: Check internet connection and cluster status

### Common Solutions
1. **For MongoDB Atlas**: Whitelist your IP address (0.0.0.0/0 for testing)
2. **For local MongoDB**: Install and start MongoDB service
3. **Environment variables**: Make sure `.env` file exists and is properly formatted

## Sample Data
After running `npm run data:import`, you'll have:
- **Admin user**: `admin@artisanscorner.com` / `123456`
- **Regular users**: `john@example.com` / `123456`, `jane@example.com` / `123456`
- **5 sample products** across different categories

## API Testing
The server will be available at: `http://localhost:5000`

Test endpoints:
- `GET /` - Welcome message
- `GET /api/products` - List products
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
