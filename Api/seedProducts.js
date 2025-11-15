const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Haraj';

// Product data extracted from HTML files
const products = [
    {
        title: "3020 نمار شقه دور ثاني",
        description: "شقة للبيع في دور ثاني",
        category: "realestate",
        price: 0,
        location: "riyadh",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"],
        owner: {
            name: "user",
            phone: "0500000001"
        },
        status: "active"
    },
    {
        title: "pipe 10 inch",
        description: "Pipe 10 inch for sale",
        category: "services",
        price: 0,
        location: "safwa",
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"],
        owner: {
            name: "mohmd ashab",
            phone: "0500000002"
        },
        status: "active"
    },
    {
        title: "كنب بحالة الجديد",
        description: "كنب بحالة ممتازة",
        category: "furniture",
        price: 2500,
        location: "dhahran",
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
        owner: {
            name: "-2ابراهيم",
            phone: "0500000003"
        },
        status: "active"
    },
    {
        title: "فرس شعبيه فاخره",
        description: "فرس شعبية فاخرة للبيع",
        category: "animals",
        price: 0,
        location: "riyadh",
        images: ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop"],
        owner: {
            name: "عضو",
            phone: "0500000004"
        },
        status: "active"
    },
    {
        title: "iPhone 17pro 1tb",
        description: "iPhone 17 Pro 1TB",
        category: "devices",
        price: 0,
        location: "riyadh",
        images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"],
        owner: {
            name: "مستخدم",
            phone: "0500000005"
        },
        status: "active"
    },
    {
        title: "ديوانية بكامل تجهيزاتها لبيع",
        description: "ديوانية كاملة مع جميع التجهيزات",
        category: "furniture",
        price: 0,
        location: "tabuk",
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
        owner: {
            name: "الدرع f1",
            phone: "0500000006"
        },
        status: "active"
    },
    {
        title: "سيارة تويوتا كامري 2020",
        description: "سيارة تويوتا كامري موديل 2020 بحالة ممتازة",
        category: "cars",
        price: 0,
        location: "riyadh",
        brand: "toyota",
        images: ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop"],
        owner: {
            name: "أحمد محمد",
            phone: "0500000007"
        },
        status: "active"
    },
    {
        title: "سيارة نيسان باترول 2019",
        description: "سيارة نيسان باترول موديل 2019",
        category: "cars",
        price: 85000,
        location: "jeddah",
        brand: "nissan",
        images: ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"],
        owner: {
            name: "سعيد علي",
            phone: "0500000008"
        },
        status: "active"
    },
    {
        title: "سامسونج جالاكسي S23",
        description: "سامسونج جالاكسي S23 جديد",
        category: "devices",
        price: 3800,
        location: "dammam",
        images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"],
        owner: {
            name: "خالد",
            phone: "0500000009"
        },
        status: "active"
    },
    {
        title: "فيلا للبيع 5 غرف",
        description: "فيلا فاخرة للبيع تتكون من 5 غرف",
        category: "realestate",
        price: 850000,
        location: "riyadh",
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop"],
        owner: {
            name: "فهد",
            phone: "0500000010"
        },
        status: "active"
    }
];

async function seedProducts() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products (optional - comment out if you want to keep existing data)
        // await Product.deleteMany({});
        // console.log('🗑️  Cleared existing products');

        // Insert products
        const insertedProducts = await Product.insertMany(products);
        console.log(`✅ Successfully inserted ${insertedProducts.length} products`);

        // Display summary
        console.log('\n📦 Inserted Products:');
        insertedProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.title} - ${product.category} - ${product.location} - ${product.price} ر.س`);
        });

        // Close connection
        await mongoose.connection.close();
        console.log('\n✅ Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        process.exit(1);
    }
}

// Run the seed function
seedProducts();

