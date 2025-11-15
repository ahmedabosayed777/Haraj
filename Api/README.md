# Haraj API

A RESTful API for the Haraj marketplace built with Node.js, Express, and MongoDB (Mongoose).

## Features

- ✅ Full CRUD operations for products
- ✅ Search functionality
- ✅ Filtering by category, location, brand, price range
- ✅ Pagination support
- ✅ Product views tracking
- ✅ MongoDB connection with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn

## Installation

1. Navigate to the Api folder:
```bash
cd Api
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on `localhost:27017`

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Products Endpoints

#### Get All Products
```
GET /api/products
```

Query Parameters:
- `category` - Filter by category (cars, realestate, devices, furniture, animals, services)
- `location` - Filter by location
- `brand` - Filter by brand
- `status` - Filter by status (active, sold, pending, inactive)
- `featured` - Filter featured products (true/false)
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sort` - Sort field (default: -createdAt)

Example:
```
GET /api/products?category=cars&location=riyadh&page=1&limit=10
```

#### Get Product by ID
```
GET /api/products/:id
```

#### Create Product
```
POST /api/products
Content-Type: application/json

{
  "title": "سيارة تويوتا كامري 2020",
  "description": "سيارة بحالة ممتازة",
  "category": "cars",
  "price": 85000,
  "location": "riyadh",
  "brand": "toyota",
  "images": ["https://example.com/image.jpg"],
  "owner": {
    "name": "أحمد محمد",
    "phone": "0501234567",
    "email": "ahmed@example.com"
  }
}
```

#### Update Product
```
PUT /api/products/:id
Content-Type: application/json

{
  "price": 80000,
  "status": "sold"
}
```

#### Delete Product
```
DELETE /api/products/:id
```

#### Search Products
```
GET /api/products/search?q=query&category=cars&location=riyadh
```

## Product Schema

```javascript
{
  title: String (required),
  description: String,
  category: String (required, enum: ['cars', 'realestate', 'devices', 'furniture', 'animals', 'services']),
  subCategory: String,
  price: Number (required, min: 0),
  location: String (required),
  brand: String,
  images: [String],
  owner: {
    name: String,
    phone: String,
    email: String
  },
  status: String (enum: ['active', 'sold', 'pending', 'inactive'], default: 'active'),
  views: Number (default: 0),
  featured: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## Example Usage

### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "شقة للبيع",
    "category": "realestate",
    "price": 500000,
    "location": "riyadh",
    "owner": {
      "name": "محمد علي",
      "phone": "0501234567"
    }
  }'
```

### Get All Cars in Riyadh
```bash
curl http://localhost:3000/api/products?category=cars&location=riyadh
```

### Search Products
```bash
curl http://localhost:3000/api/products/search?q=تويوتا&category=cars
```

## Database

- **Database Name**: Haraj
- **Collection Name**: Products
- **Connection URL**: mongodb://localhost:27017/Haraj

## Error Handling

All endpoints return JSON responses with a `success` field:

```json
{
  "success": true,
  "data": {...}
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

## License

ISC

