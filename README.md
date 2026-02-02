# 🎨 Artisan's Corner - Indian E-commerce Platform

A complete, modern e-commerce platform designed specifically for Indian artisans and handicraft makers. Built with React, Node.js, MongoDB, and integrated with Razorpay for seamless Indian payment processing.

## ✨ Features

### 🛍️ E-commerce Features
- **Product Catalog**: Browse and search handmade products
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Secure login/registration system
- **Product Reviews**: Customer rating and review system
- **Responsive Design**: Mobile-first, beautiful UI

### 🇮🇳 India-Focused
- **Razorpay Integration**: Free payment gateway for Indian businesses
- **INR Currency**: All prices in Indian Rupees
- **UPI Support**: Accept UPI, cards, net banking
- **GST Ready**: Built-in tax calculations
- **Localized Content**: Indian artisan-focused products

### 🔧 Technical Features
- **Modern Stack**: React + Redux + Node.js + MongoDB
- **Real-time Updates**: Live cart and inventory management
- **Secure API**: JWT authentication, input validation
- **Image Upload**: Cloudinary integration for product images
- **Admin Dashboard**: Product and order management

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd artisans-corner
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Setup**
   ```bash
   # Copy backend configuration
   cp backend/config.env backend/.env
   
   # Edit backend/.env with your settings
   # - MongoDB connection string
   # - JWT secret
   # - Cloudinary credentials
   # - Razorpay keys (optional for testing)
   ```

4. **Database Setup**
   ```bash
   # Test database connection
   npm run test:db
   
   # Import sample data
   npm run data:import
   ```

5. **Start Development Servers**
   ```bash
   npm run dev
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📁 Project Structure

```
artisans-corner/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication & validation
│   ├── data/              # Sample data seeder
│   └── server.js          # Main server file
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store & slices
│   │   └── App.js         # Main app component
│   └── public/            # Static assets
└── README.md              # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI library
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **React Icons**: Icon library
- **Axios**: HTTP client
- **React Toastify**: Notifications

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Multer**: File uploads
- **Cloudinary**: Image storage
- **Razorpay**: Payment gateway

## 💳 Payment Integration

### Razorpay Setup (Free for Indians)
1. Create account at [razorpay.com](https://razorpay.com)
2. Complete KYC (required for Indian businesses)
3. Get API keys from Settings → API Keys
4. Add to `.env`:
   ```
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

### Test Mode
- **Test Card**: 4111 1111 1111 1111
- **Test UPI**: success@razorpay
- **Test Net Banking**: Any bank

## 📊 Sample Data

After running `npm run data:import`, you'll have:

### Users
- **Admin**: `admin@artisanscorner.com` / `123456`
- **Customer**: `john@example.com` / `123456`

### Products
- Handmade Ceramic Mug - ₹299
- Wooden Cutting Board - ₹899
- Handwoven Cotton Scarf - ₹599
- Glass Vase - ₹1,299
- Leather Wallet - ₹799

## 🔧 Available Scripts

### Development
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start backend only
npm run client       # Start frontend only
```

### Database
```bash
npm run data:import  # Import sample data
npm run data:destroy # Clear all data
npm run test:db      # Test database connection
```

### Testing
```bash
npm run test:api     # Test API endpoints
npm run test:payment # Test payment integration
```

### Production
```bash
npm run build        # Build frontend for production
npm start           # Start production server
```

## 🌐 API Endpoints

### Authentication
- `POST /api/users` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order (Protected)

### Payments
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/:paymentId` - Get payment details

## 🎯 Perfect For

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

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy to Vercel or Netlify
3. Set environment variables

### Backend (Railway/Render)
1. Deploy to Railway or Render
2. Set environment variables
3. Connect to MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Razorpay** for free payment processing
- **MongoDB Atlas** for free database hosting
- **Cloudinary** for image storage
- **Tailwind CSS** for beautiful styling

---

**Made with ❤️ in India for Indian Artisans**

*Supporting local craftsmen and preserving traditional art forms through modern technology.*
