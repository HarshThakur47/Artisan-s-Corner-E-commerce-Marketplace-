# API Documentation

## Base URL: `http://localhost:5000/api`

## Authentication
Include JWT token in headers: `Authorization: Bearer <token>`

## Endpoints

### Users
- `POST /users` - Register user
- `POST /users/login` - Login user
- `GET /users/profile` - Get profile (Protected)
- `PUT /users/profile` - Update profile (Protected)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)
- `POST /products/:id/reviews` - Add review (Protected)

### Orders
- `POST /orders` - Create order (Protected)
- `GET /orders/myorders` - Get user orders (Protected)
- `GET /orders/:id` - Get order (Protected)
- `PUT /orders/:id/pay` - Mark as paid (Protected)

### Upload
- `POST /upload` - Upload image (Admin)

### Payment
- `POST /payment/create-order` - Create Razorpay order (Protected)
- `POST /payment/verify` - Verify payment signature (Protected)
- `GET /payment/:paymentId` - Get payment details (Protected)

## Sample Requests

### Register User
```json
POST /users
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Login
```json
POST /users/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Create Product (Admin)
```json
POST /products
Authorization: Bearer <token>
{
  "name": "Handmade Mug",
  "price": 299,
  "description": "Beautiful ceramic mug",
  "image": "https://example.com/image.jpg",
  "category": "Ceramics",
  "countInStock": 10
}
```

### Create Payment Order
```json
POST /payment/create-order
Authorization: Bearer <token>
{
  "amount": 299,
  "currency": "INR"
}
```
