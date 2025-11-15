# Haraj API Documentation
## Simple Guide to Understanding the API and Code

---

## Table of Contents
1. [What is This API?](#what-is-this-api)
2. [How Does It Work?](#how-does-it-work)
3. [API Endpoints Explained](#api-endpoints-explained)
4. [Code Explanation](#code-explanation)
5. [How to Use the API](#how-to-use-the-api)

---

## What is This API?

The Haraj API is a **RESTful API** (a way for different applications to talk to each other) that manages products for an online marketplace. Think of it as a **middleman** between your website and the database.

### What It Does:
- Stores product information in a MongoDB database
- Allows you to create, read, update, and delete products
- Lets you search and filter products
- Tracks how many times a product has been viewed

### Key Components:
1. **Server** (`server.js`) - The main application that handles requests
2. **Routes** (`routes/products.js`) - Defines what happens when you visit different URLs
3. **Model** (`models/Product.js`) - Defines the structure of a product in the database

---

## How Does It Work?

### The Flow:
```
User Request → Server → Database → Server → Response to User
```

1. **User sends a request** (like "get all products")
2. **Server receives the request** and processes it
3. **Server talks to MongoDB** to get or save data
4. **Server sends back a response** with the data or a message

### Example:
- User visits: `http://localhost:3000/api/products`
- Server looks in the database for all products
- Server sends back a list of products in JSON format

---

## API Endpoints Explained

An **endpoint** is a specific URL that does a specific job. Think of it like different doors in a building - each door leads to a different room.

### 1. Get All Products
**URL:** `GET /api/products`

**What it does:** Returns a list of all products in the database

**Optional Filters (add to URL):**
- `?category=cars` - Only show cars
- `?location=riyadh` - Only show products in Riyadh
- `?brand=toyota` - Only show Toyota products
- `?minPrice=1000&maxPrice=50000` - Show products between these prices
- `?page=1&limit=10` - Show 10 products per page
- `?status=active` - Only show active products

**Example Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 10,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "123...",
      "title": "سيارة تويوتا",
      "category": "cars",
      "price": 85000,
      "location": "riyadh"
    }
  ]
}
```

---

### 2. Get One Product by ID
**URL:** `GET /api/products/:id`

**What it does:** Returns details of one specific product

**Example:** `GET /api/products/6918386fc8aa88773214fcb2`

**What happens:** 
- Finds the product with that ID
- Automatically increases the view count by 1
- Returns the product details

---

### 3. Create a New Product
**URL:** `POST /api/products`

**What it does:** Adds a new product to the database

**Required Information:**
- `title` - Product name (required)
- `category` - Product category (required)
- `price` - Product price (required)
- `location` - Where the product is located (required)

**Optional Information:**
- `description` - More details about the product
- `brand` - Brand name (for cars, etc.)
- `images` - Array of image URLs
- `owner` - Information about the seller (name, phone, email)
- `status` - active, sold, pending, or inactive

**Example Request:**
```json
{
  "title": "سيارة جديدة",
  "category": "cars",
  "price": 50000,
  "location": "riyadh",
  "brand": "toyota",
  "owner": {
    "name": "أحمد",
    "phone": "0501234567"
  }
}
```

---

### 4. Update a Product
**URL:** `PUT /api/products/:id`

**What it does:** Updates information about an existing product

**Example:** `PUT /api/products/6918386fc8aa88773214fcb2`

**You can update:**
- Price
- Status (change from "active" to "sold")
- Description
- Any other field

**Example Request:**
```json
{
  "price": 45000,
  "status": "sold"
}
```

---

### 5. Delete a Product
**URL:** `DELETE /api/products/:id`

**What it does:** Removes a product from the database permanently

**Example:** `DELETE /api/products/6918386fc8aa88773214fcb2`

**Warning:** This action cannot be undone!

---

### 6. Search Products
**URL:** `GET /api/products/search`

**What it does:** Searches for products by keywords

**Parameters:**
- `?q=تويوتا` - Search for products containing "تويوتا"
- `?category=cars` - Filter by category
- `?location=riyadh` - Filter by location
- `?brand=toyota` - Filter by brand

**Example:** `GET /api/products/search?q=سيارة&category=cars`

---

## Code Explanation

### File 1: `server.js` - The Main Server

This is the **heart** of your API. It sets up everything and starts the server.

#### What Each Part Does:

```javascript
const express = require('express');
```
**Meaning:** Import Express library - this helps us create the web server

```javascript
const mongoose = require('mongoose');
```
**Meaning:** Import Mongoose - this helps us talk to MongoDB database

```javascript
const app = express();
```
**Meaning:** Create an Express application (our server)

```javascript
app.use(cors());
```
**Meaning:** Allow other websites to use this API (security setting)

```javascript
app.use(express.json());
```
**Meaning:** Allow the server to understand JSON data (the format we use to send data)

```javascript
mongoose.connect(MONGODB_URI)
```
**Meaning:** Connect to the MongoDB database

```javascript
app.use('/api/products', productsRoutes);
```
**Meaning:** When someone visits `/api/products`, use the routes defined in `products.js`

```javascript
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```
**Meaning:** Start the server and listen for requests on port 3000

---

### File 2: `routes/products.js` - The Routes

This file defines **what happens** when someone visits different URLs.

#### GET All Products Route:

```javascript
router.get('/', async (req, res) => {
```
**Meaning:** When someone visits `/api/products` with GET request, do this...

```javascript
const { category, location, brand } = req.query;
```
**Meaning:** Get filter parameters from the URL (like `?category=cars`)

```javascript
const query = {};
if (category) query.category = category;
```
**Meaning:** Build a search query. If category is provided, add it to the query.

```javascript
const products = await Product.find(query)
```
**Meaning:** Search the database for products matching the query

```javascript
res.json({ success: true, data: products });
```
**Meaning:** Send back the products as JSON

#### POST Create Product Route:

```javascript
router.post('/', async (req, res) => {
```
**Meaning:** When someone sends a POST request to `/api/products`...

```javascript
const product = new Product(req.body);
```
**Meaning:** Create a new product object from the data sent

```javascript
const savedProduct = await product.save();
```
**Meaning:** Save the product to the database

```javascript
res.status(201).json({ success: true, data: savedProduct });
```
**Meaning:** Send back a success message with the saved product

#### PUT Update Product Route:

```javascript
router.put('/:id', async (req, res) => {
```
**Meaning:** When someone sends a PUT request to `/api/products/:id`...

```javascript
const product = await Product.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true }
);
```
**Meaning:** Find the product by ID and update it with new data

#### DELETE Product Route:

```javascript
router.delete('/:id', async (req, res) => {
```
**Meaning:** When someone sends a DELETE request...

```javascript
const product = await Product.findByIdAndDelete(req.params.id);
```
**Meaning:** Find and delete the product from the database

---

### File 3: `models/Product.js` - The Product Structure

This file defines **what a product looks like** in the database. It's like a blueprint.

#### The Schema (Structure):

```javascript
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});
```
**Meaning:** A product must have a title, and it must be text (String)

```javascript
category: {
  type: String,
  enum: ['cars', 'realestate', 'devices', 'furniture', 'animals', 'services']
}
```
**Meaning:** Category must be one of these specific values

```javascript
price: {
  type: Number,
  required: true,
  min: 0
}
```
**Meaning:** Price must be a number, it's required, and can't be negative

```javascript
owner: {
  name: String,
  phone: String,
  email: String
}
```
**Meaning:** Owner is an object containing name, phone, and email

```javascript
status: {
  type: String,
  enum: ['active', 'sold', 'pending', 'inactive'],
  default: 'active'
}
```
**Meaning:** Status can only be one of these values, and defaults to "active"

#### Special Features:

```javascript
productSchema.index({ title: 'text', description: 'text' });
```
**Meaning:** Create an index for faster text searching

```javascript
productSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};
```
**Meaning:** Create a function that increases the view count by 1

```javascript
timestamps: true
```
**Meaning:** Automatically add `createdAt` and `updatedAt` fields

---

## How to Use the API

### Starting the Server:

1. Open terminal in the `Api` folder
2. Run: `npm start`
3. You should see: "Server is running on http://localhost:3000"

### Testing the API:

#### Using Browser:
- Visit: `http://localhost:3000/api/products`
- You'll see all products in JSON format

#### Using curl (Terminal):
```bash
# Get all products
curl http://localhost:3000/api/products

# Get products by category
curl http://localhost:3000/api/products?category=cars

# Get one product
curl http://localhost:3000/api/products/PRODUCT_ID

# Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Product","category":"devices","price":100,"location":"riyadh"}'
```

#### Using JavaScript (Fetch):
```javascript
// Get all products
fetch('http://localhost:3000/api/products')
  .then(response => response.json())
  .then(data => console.log(data));

// Create a product
fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "New Product",
    category: "devices",
    price: 500,
    location: "riyadh"
  })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Common Error Messages

### 404 - Not Found
**Meaning:** The URL you're trying to access doesn't exist
**Solution:** Check the URL spelling

### 400 - Bad Request
**Meaning:** The data you sent is invalid (missing required fields, wrong format)
**Solution:** Check that all required fields are included

### 500 - Server Error
**Meaning:** Something went wrong on the server
**Solution:** Check the server logs for details

---

## Summary

### What You Learned:
1. **API** = A way for applications to communicate
2. **Endpoints** = Different URLs that do different things
3. **GET** = Retrieve data
4. **POST** = Create new data
5. **PUT** = Update existing data
6. **DELETE** = Remove data
7. **MongoDB** = Database that stores your products
8. **Mongoose** = Tool that helps Node.js talk to MongoDB

### The Flow:
1. User makes a request → 
2. Server receives it → 
3. Server talks to database → 
4. Server sends response back

### Key Files:
- `server.js` - Starts the server
- `routes/products.js` - Handles requests
- `models/Product.js` - Defines product structure

---

## Quick Reference

| Action | Method | URL | Description |
|--------|--------|-----|-------------|
| Get All | GET | `/api/products` | Get all products |
| Get One | GET | `/api/products/:id` | Get one product |
| Create | POST | `/api/products` | Add new product |
| Update | PUT | `/api/products/:id` | Update product |
| Delete | DELETE | `/api/products/:id` | Remove product |
| Search | GET | `/api/products/search?q=query` | Search products |

---

**End of Documentation**

*This API was created for the Haraj marketplace project.*

