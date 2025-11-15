# PowerShell script to insert products via API
# Make sure the API server is running on http://localhost:3000

$apiUrl = "http://localhost:3000/api/products"

$products = @(
    @{
        title = "3020 نمار شقه دور ثاني"
        description = "شقة للبيع في دور ثاني"
        category = "realestate"
        price = 0
        location = "riyadh"
        images = @("https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop")
        owner = @{
            name = "user"
            phone = "0500000001"
        }
        status = "active"
    },
    @{
        title = "pipe 10 inch"
        description = "Pipe 10 inch for sale"
        category = "services"
        price = 0
        location = "safwa"
        images = @("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop")
        owner = @{
            name = "mohmd ashab"
            phone = "0500000002"
        }
        status = "active"
    },
    @{
        title = "كنب بحالة الجديد"
        description = "كنب بحالة ممتازة"
        category = "furniture"
        price = 2500
        location = "dhahran"
        images = @("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop")
        owner = @{
            name = "-2ابراهيم"
            phone = "0500000003"
        }
        status = "active"
    },
    @{
        title = "فرس شعبيه فاخره"
        description = "فرس شعبية فاخرة للبيع"
        category = "animals"
        price = 0
        location = "riyadh"
        images = @("https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=300&fit=crop")
        owner = @{
            name = "عضو"
            phone = "0500000004"
        }
        status = "active"
    },
    @{
        title = "iPhone 17pro 1tb"
        description = "iPhone 17 Pro 1TB"
        category = "devices"
        price = 0
        location = "riyadh"
        images = @("https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop")
        owner = @{
            name = "مستخدم"
            phone = "0500000005"
        }
        status = "active"
    },
    @{
        title = "ديوانية بكامل تجهيزاتها لبيع"
        description = "ديوانية كاملة مع جميع التجهيزات"
        category = "furniture"
        price = 0
        location = "tabuk"
        images = @("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop")
        owner = @{
            name = "الدرع f1"
            phone = "0500000006"
        }
        status = "active"
    },
    @{
        title = "سيارة تويوتا كامري 2020"
        description = "سيارة تويوتا كامري موديل 2020 بحالة ممتازة"
        category = "cars"
        price = 0
        location = "riyadh"
        brand = "toyota"
        images = @("https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop")
        owner = @{
            name = "أحمد محمد"
            phone = "0500000007"
        }
        status = "active"
    },
    @{
        title = "سيارة نيسان باترول 2019"
        description = "سيارة نيسان باترول موديل 2019"
        category = "cars"
        price = 85000
        location = "jeddah"
        brand = "nissan"
        images = @("https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop")
        owner = @{
            name = "سعيد علي"
            phone = "0500000008"
        }
        status = "active"
    },
    @{
        title = "سامسونج جالاكسي S23"
        description = "سامسونج جالاكسي S23 جديد"
        category = "devices"
        price = 3800
        location = "dammam"
        images = @("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop")
        owner = @{
            name = "خالد"
            phone = "0500000009"
        }
        status = "active"
    },
    @{
        title = "فيلا للبيع 5 غرف"
        description = "فيلا فاخرة للبيع تتكون من 5 غرف"
        category = "realestate"
        price = 850000
        location = "riyadh"
        images = @("https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop")
        owner = @{
            name = "فهد"
            phone = "0500000010"
        }
        status = "active"
    }
)

Write-Host "🚀 Starting to insert products via API..." -ForegroundColor Green
Write-Host "📡 API URL: $apiUrl" -ForegroundColor Cyan
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($product in $products) {
    try {
        $jsonBody = $product | ConvertTo-Json -Depth 10 -Compress
        
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $jsonBody -ContentType "application/json; charset=utf-8" -ErrorAction Stop
        
        if ($response.success) {
            Write-Host "✅ Inserted: $($product.title)" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host "❌ Failed: $($product.title) - $($response.message)" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "❌ Error inserting $($product.title): $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    
    Start-Sleep -Milliseconds 200
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Yellow
Write-Host "   ✅ Success: $successCount" -ForegroundColor Green
Write-Host "   ❌ Failed: $failCount" -ForegroundColor Red
Write-Host "   📦 Total: $($products.Count)" -ForegroundColor Cyan

