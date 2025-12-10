# 🇮🇳 Artisan's Corner - India Setup Guide

## 🎯 Perfect for Indian Artisans & Small Businesses

This e-commerce platform is specifically designed for Indian artisans, handicraft makers, and small businesses. It uses **Razorpay** - India's most trusted payment gateway that's **completely free** for Indian businesses.

## ✨ Why This Platform is Perfect for India

### 🆓 Cost-Effective
- **Razorpay**: Free setup, no monthly charges, only transaction fees
- **MongoDB Atlas**: Free tier with 512MB storage
- **Cloudinary**: Free tier with 25GB storage
- **Vercel/Netlify**: Free hosting for frontend

### 🇮🇳 India-Focused Features
- **Indian Currency (INR)**: All prices in Rupees
- **UPI Support**: Accept UPI payments instantly
- **Multiple Payment Methods**: Cards, net banking, wallets
- **GST Ready**: Easy to add GST calculations
- **Local Language Support**: Can be extended for Hindi/regional languages

### 🛠️ Easy to Use
- **No Coding Required**: Simple setup process
- **Mobile Friendly**: Works perfectly on phones
- **Admin Dashboard**: Easy product and order management
- **Inventory Management**: Track stock levels

## 🚀 Quick Start (5 Minutes)

### Step 1: Environment Setup
```bash
# Copy configuration
copy config.env .env

# Edit .env file with your settings
# Use local MongoDB for testing
MONGODB_URI=mongodb://localhost:27017/artisans-corner
```

### Step 2: Install & Run
```bash
npm install
npm run dev
```

### Step 3: Test Everything
```bash
npm run test:db      # Test database
npm run data:import  # Add sample products
npm run test:api     # Test all features
```

## 💳 Razorpay Setup (Free for Indians)

### Why Razorpay?
- ✅ **Zero Setup Fee**
- ✅ **No Monthly Charges**
- ✅ **Supports UPI, Cards, Net Banking**
- ✅ **Trusted by 8M+ businesses**
- ✅ **Excellent Support**

### Setup Process:
1. **Create Account**: [razorpay.com](https://razorpay.com)
2. **Complete KYC**: Required for Indian businesses
3. **Get API Keys**: Settings → API Keys
4. **Add to .env**:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

### Test Mode (Development)
- **Test Card**: 4111 1111 1111 1111
- **Test UPI**: success@razorpay
- **Test Net Banking**: Any bank

## 📱 Sample Products (Indian Market)

The platform comes with sample products perfect for Indian artisans:

1. **Handmade Ceramic Mug** - ₹299
2. **Wooden Cutting Board** - ₹899
3. **Handwoven Cotton Scarf** - ₹599
4. **Glass Vase** - ₹1,299
5. **Leather Wallet** - ₹799

## 🏪 Perfect for These Businesses

### 🎨 Artisans & Craftsmen
- Handloom weavers
- Pottery makers
- Woodworkers
- Jewelry makers
- Textile artists

### 🏪 Small Businesses
- Local handicraft shops
- Home-based businesses
- Artisan cooperatives
- Boutique stores
- Gift shops

### 🎯 Features You'll Love
- **Inventory Management**: Track stock levels
- **Order Management**: Process orders easily
- **Customer Reviews**: Build trust
- **Payment Tracking**: Know when money arrives
- **Mobile Friendly**: Customers can shop on phones

## 💰 Pricing & Costs

### One-Time Setup: ₹0
- Platform setup: Free
- Razorpay setup: Free
- Database setup: Free

### Monthly Costs: ₹0
- Hosting: Free (Vercel/Netlify)
- Database: Free (MongoDB Atlas)
- Payment gateway: Free (Razorpay)

### Transaction Fees
- **Razorpay**: 2% + GST (only when you make sales)
- **No hidden charges**

## 🔧 Technical Requirements

### For Development
- Node.js (free)
- MongoDB (free tier)
- Git (free)

### For Production
- Vercel/Netlify account (free)
- MongoDB Atlas account (free)
- Razorpay account (free)

## 📞 Support & Help

### Documentation
- `README.md` - Basic setup
- `SETUP.md` - Detailed instructions
- `API.md` - API documentation

### Test Scripts
- `npm run test:db` - Database test
- `npm run test:api` - API test
- `npm run test:payment` - Payment test

### Common Issues
1. **MongoDB Connection**: Use local MongoDB for testing
2. **Payment Setup**: Start with test mode
3. **Environment Variables**: Make sure .env file exists

## 🎉 Success Stories

This platform is perfect for:
- **Rural artisans** selling handicrafts
- **Urban craftsmen** with unique products
- **Small businesses** wanting online presence
- **Artisan cooperatives** managing multiple sellers

## 🚀 Next Steps

1. **Set up the platform** (5 minutes)
2. **Add your products** (replace sample data)
3. **Customize design** (optional)
4. **Go live** with real payments

## 📞 Need Help?

- Check the documentation files
- Run the test scripts
- Use the sample data as reference
- All tools used are free and well-documented

---

**Ready to start your online business? Let's get you set up in 5 minutes! 🚀**
