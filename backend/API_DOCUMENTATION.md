# Artisan's Corner API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
- **POST** `/users`
- **Access**: Public
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response**:
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
- **POST** `/users/login`
- **Access**: Public
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
- **Response**: Same as register

#### Get User Profile
- **GET** `/users/profile`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
```json
{
  "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false
}
```

#### Update User Profile
- **PUT** `/users/profile`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "password": "newpassword"
}
```

### Products

#### Get All Products
- **GET** `/products`
- **Access**: Public
- **Query Parameters**:
  - `keyword`: Search term
  - `pageNumber`: Page number (default: 1)
- **Response**:
```json
{
  "products": [
    {
      "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "Handmade Ceramic Mug",
      "image": "https://example.com/image.jpg",
      "category": "Ceramics",
      "description": "Beautiful handcrafted mug",
      "price": 25.99,
      "countInStock": 15,
      "rating": 4.5,
      "numReviews": 12,
      "reviews": []
    }
  ],
  "page": 1,
  "pages": 1
}
```

#### Get Single Product
- **GET** `/products/:id`
- **Access**: Public
- **Response**: Single product object

#### Create Product
- **POST** `/products`
- **Access**: Admin Only
- **Headers**: `Authorization: Bearer <admin_token>`
- **Body**:
```json
{
  "name": "New Product",
  "price": 29.99,
  "description": "Product description",
  "image": "https://example.com/image.jpg",
  "category": "Category",
  "countInStock": 10
}
```

#### Update Product
- **PUT** `/products/:id`
- **Access**: Admin Only
- **Headers**: `Authorization: Bearer <admin_token>`
- **Body**: Same as create product

#### Delete Product
- **DELETE** `/products/:id`
- **Access**: Admin Only
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**:
```json
{
  "message": "Product removed"
}
```

#### Add Product Review
- **POST** `/products/:id/reviews`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "rating": 5,
  "comment": "Great product!"
}
```

#### Get Top Products
- **GET** `/products/top`
- **Access**: Public
- **Response**: Array of top 3 rated products

### Orders

#### Create Order
- **POST** `/orders`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "orderItems": [
    {
      "name": "Handmade Ceramic Mug",
      "qty": 2,
      "image": "https://example.com/image.jpg",
      "price": 25.99,
      "product": "60f7b3b3b3b3b3b3b3b3b3b3"
    }
  ],
  "shippingAddress": {
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "PayPal",
  "itemsPrice": 51.98,
  "taxPrice": 5.20,
  "shippingPrice": 10.00,
  "totalPrice": 67.18
}
```

#### Get User Orders
- **GET** `/orders/myorders`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Array of user's orders

#### Get Order by ID
- **GET** `/orders/:id`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Single order object

#### Update Order to Paid
- **PUT** `/orders/:id/pay`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "id": "pi_1234567890",
  "status": "succeeded",
  "update_time": "2023-01-01T00:00:00Z",
  "payer": {
    "email_address": "payer@example.com"
  }
}
```

#### Update Order to Delivered
- **PUT** `/orders/:id/deliver`
- **Access**: Admin Only
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**: Updated order object

#### Get All Orders (Admin)
- **GET** `/orders`
- **Access**: Admin Only
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**: Array of all orders

### File Upload

#### Upload Image
- **POST** `/upload`
- **Access**: Admin Only
- **Headers**: 
  - `Authorization: Bearer <admin_token>`
  - `Content-Type: multipart/form-data`
- **Body**: Form data with `image` field
- **Response**:
```json
{
  "url": "https://res.cloudinary.com/example/image/upload/v123/image.jpg",
  "public_id": "artisans-corner/image_123"
}
```

#### Delete Image
- **DELETE** `/upload/:public_id`
- **Access**: Admin Only
- **Headers**: `Authorization: Bearer <admin_token>`
- **Response**:
```json
{
  "message": "Image deleted successfully"
}
```

### Payments

#### Create Payment Intent
- **POST** `/payment/create-payment-intent`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
```json
{
  "amount": 67.18
}
```
- **Response**:
```json
{
  "clientSecret": "pi_1234567890_secret_abcdef"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

## Testing

Use the provided test script to verify API functionality:

```bash
npm run data:import  # Import sample data
node test-api.js     # Run API tests
```

## Sample Data

The seeder script creates:
- Admin user: `admin@artisanscorner.com` / `123456`
- Regular users: `john@example.com` / `123456`, `jane@example.com` / `123456`
- 5 sample products across different categories
