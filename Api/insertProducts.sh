#!/bin/bash
# Bash script to insert products via API
# Make sure the API server is running on http://localhost:3000

API_URL="http://localhost:3000/api/products"

echo "🚀 Starting to insert products via API..."
echo "📡 API URL: $API_URL"
echo ""

# Function to insert a product
insert_product() {
    local json_data="$1"
    local title="$2"
    
    response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
        -H "Content-Type: application/json; charset=utf-8" \
        -d "$json_data")
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -eq 201 ] || [ "$http_code" -eq 200 ]; then
        echo "✅ Inserted: $title"
        return 0
    else
        echo "❌ Failed: $title (HTTP $http_code)"
        echo "   Response: $body"
        return 1
    fi
}

# Product 1
insert_product '{
    "title": "3020 نمار شقه دور ثاني",
    "description": "شقة للبيع في دور ثاني",
    "category": "realestate",
    "price": 0,
    "location": "riyadh",
    "images": ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"],
    "owner": {"name": "user", "phone": "0500000001"},
    "status": "active"
}' "3020 نمار شقه دور ثاني"

# Product 2
insert_product '{
    "title": "pipe 10 inch",
    "description": "Pipe 10 inch for sale",
    "category": "services",
    "price": 0,
    "location": "safwa",
    "images": ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"],
    "owner": {"name": "mohmd ashab", "phone": "0500000002"},
    "status": "active"
}' "pipe 10 inch"

# Product 3
insert_product '{
    "title": "كنب بحالة الجديد",
    "description": "كنب بحالة ممتازة",
    "category": "furniture",
    "price": 2500,
    "location": "dhahran",
    "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
    "owner": {"name": "-2ابراهيم", "phone": "0500000003"},
    "status": "active"
}' "كنب بحالة الجديد"

# Product 4
insert_product '{
    "title": "فرس شعبيه فاخره",
    "description": "فرس شعبية فاخرة للبيع",
    "category": "animals",
    "price": 0,
    "location": "riyadh",
    "images": ["https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop"],
    "owner": {"name": "عضو", "phone": "0500000004"},
    "status": "active"
}' "فرس شعبيه فاخره"

# Product 5
insert_product '{
    "title": "iPhone 17pro 1tb",
    "description": "iPhone 17 Pro 1TB",
    "category": "devices",
    "price": 0,
    "location": "riyadh",
    "images": ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop"],
    "owner": {"name": "مستخدم", "phone": "0500000005"},
    "status": "active"
}' "iPhone 17pro 1tb"

# Product 6
insert_product '{
    "title": "ديوانية بكامل تجهيزاتها لبيع",
    "description": "ديوانية كاملة مع جميع التجهيزات",
    "category": "furniture",
    "price": 0,
    "location": "tabuk",
    "images": ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
    "owner": {"name": "الدرع f1", "phone": "0500000006"},
    "status": "active"
}' "ديوانية بكامل تجهيزاتها لبيع"

# Product 7
insert_product '{
    "title": "سيارة تويوتا كامري 2020",
    "description": "سيارة تويوتا كامري موديل 2020 بحالة ممتازة",
    "category": "cars",
    "price": 0,
    "location": "riyadh",
    "brand": "toyota",
    "images": ["https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop"],
    "owner": {"name": "أحمد محمد", "phone": "0500000007"},
    "status": "active"
}' "سيارة تويوتا كامري 2020"

# Product 8
insert_product '{
    "title": "سيارة نيسان باترول 2019",
    "description": "سيارة نيسان باترول موديل 2019",
    "category": "cars",
    "price": 85000,
    "location": "jeddah",
    "brand": "nissan",
    "images": ["https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"],
    "owner": {"name": "سعيد علي", "phone": "0500000008"},
    "status": "active"
}' "سيارة نيسان باترول 2019"

# Product 9
insert_product '{
    "title": "سامسونج جالاكسي S23",
    "description": "سامسونج جالاكسي S23 جديد",
    "category": "devices",
    "price": 3800,
    "location": "dammam",
    "images": ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"],
    "owner": {"name": "خالد", "phone": "0500000009"},
    "status": "active"
}' "سامسونج جالاكسي S23"

# Product 10
insert_product '{
    "title": "فيلا للبيع 5 غرف",
    "description": "فيلا فاخرة للبيع تتكون من 5 غرف",
    "category": "realestate",
    "price": 850000,
    "location": "riyadh",
    "images": ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop"],
    "owner": {"name": "فهد", "phone": "0500000010"},
    "status": "active"
}' "فيلا للبيع 5 غرف"

echo ""
echo "✅ All products inserted!"

