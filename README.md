# Haraj

Souq Haraj — a community marketplace web project (front-end + API) for listing and searching used goods (cars, devices, furniture, real estate, animals, services).

Screenshots: assets/images/haraj-1.png, assets/images/haraj-2.png

---

## Table of contents
- [About](#about)
- [Technologies](#technologies)
- [Features](#features)
- [Architecture](#architecture)
- [Getting started (local)](#getting-started-local)
- [Environment variables](#environment-variables)
- [API Endpoints (summary)](#api-endpoints-summary)
- [Seeding sample data](#seeding-sample-data)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## About
Haraj is a marketplace prototype built to demonstrate a local classifieds platform with search, filters, product details, and a small REST API. The front-end is static HTML/CSS/JS and the backend API is Node.js + Express with MongoDB (Mongoose).

## Technologies
- Front-end: HTML, CSS, Bootstrap (static)
- Back-end: Node.js, Express
- Database: MongoDB, Mongoose
- Tools: dotenv, nodemon (dev)

## Features
- Create, read, update, delete (CRUD) products
- Search and filter by category, brand, location and price
- Pagination and featured product support
- Product view tracking
- Simple REST API for front-end consumption

## Architecture
- `Api/` — Express API (server.js, routes, models)
- `static/` (or top-level HTML files) — front-end pages
- `Api/seedProducts.js` — sample product seeder for development

## Getting started (local)
Prerequisites:
- Node.js v14+ (or latest LTS)
- MongoDB (local or remote)
- npm (or yarn)

Quick start:
```bash
# clone
git clone git@github.com:ahmedabosayed777/Haraj.git
cd Haraj/Api

# install dependencies
npm install

# create .env from example and update MONGODB_URI
cp .env.example .env
# edit .env -> set MONGODB_URI (see example below)

# run in development (auto-reload)
npm run dev

# or start normally
npm start
```

The API will run by default at: http://localhost:3000

## Environment variables
Create an `.env` file in `Api/` with the following:

```env
# Api/.env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/Haraj
# If you use a remote MongoDB (Atlas), set the full connection string here:
# MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/Haraj?retryWrites=true&w=majority
```

Important: Do NOT commit `.env` to the repo. See Security below.

## API Endpoints (summary)
Base URL: `http://localhost:3000`

- Get all products
  - GET /api/products
  - Query params: `category`, `location`, `brand`, `minPrice`, `maxPrice`, `page`, `limit`, `sort`
  - Example:
    ```bash
    curl "http://localhost:3000/api/products?category=cars&location=riyadh&page=1&limit=10"
    ```

- Get product by id
  - GET /api/products/:id
  - Example:
    ```bash
    curl "http://localhost:3000/api/products/64a5e0a1f2c3b4d5e6f7a8b9"
    ```

- Create product
  - POST /api/products
  - Content-Type: application/json
  - Example payload:
    ```json
    {
      "title": "Toyota Camry 2020",
      "category": "cars",
      "price": 85000,
      "location": "riyadh",
      "owner": { "name": "Ahmed", "phone": "0501234567" }
    }
    ```

- Update product
  - PUT /api/products/:id

- Delete product
  - DELETE /api/products/:id

(For full route details see `Api/routes/products.js` or `Api/API_DOCUMENTATION.html`)

## Seeding sample data
The repository includes a seeder to insert example products (useful for development):

```bash
cd Api
npm run seed
```

This script reads `Api/seedProducts.js` and inserts demo products into the configured MongoDB.

## Security
- I performed a read-only scan of the `Api/` folder and recent commits; no `.env`, service-account JSON, or hard-coded private keys were found in the Api folder. The API reads DB credentials from `process.env.MONGODB_URI` — good practice.
- Best practices:
  - Add `Api/.env` to `.gitignore` (do not commit real credentials).
  - If you ever commit secrets by mistake, remove them from history and rotate keys.
  - Limit access for production DB users (least privilege) and use connection strings with scoped accounts.

Suggested `.gitignore` lines (add to repo root or `Api/.gitignore`):
```gitignore
# Node / dotenv
Api/.env
/node_modules
/Api/node_modules
/dist
/build
```

## Contributing
- Open an issue or pull request for bug fixes or improvements.
- If you're adding features, include tests and update docs.

## License
MIT — see [LICENSE](LICENSE) for details.
