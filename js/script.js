// Initialize Logo Images with Reliable Sources
function initLogos() {
    // Using direct, working image URLs
    const logoConfigs = {
        'toyota': [
            'https://1000logos.net/wp-content/uploads/2018/02/Toyota-logo.png',
            'https://www.carlogos.org/car-logos/toyota-logo-3700x1200.png',
            'https://logos-world.net/wp-content/uploads/2020/05/Toyota-Logo.png',
            'https://logo.clearbit.com/toyota.com'
        ],
        'nissan': [
            'https://www.freepnglogos.com/uploads/nissan-logo-png/nissan-logo-png-images-download-logos-2.png',
            'https://www.pngall.com/wp-content/uploads/2016/04/Nissan-Logo-PNG-Pic.png',
            'https://www.seeklogo.com/images/N/nissan-logo-783F4F5A4D-seeklogo.com.png',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Nissan_2020_logo.svg/512px-Nissan_2020_logo.svg.png'
        ],
        'ford': [
            'https://www.carlogos.org/car-logos/ford-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/Ford-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/Ford-Logo.png',
            'https://logo.clearbit.com/ford.com'
        ],
        'lexus': [
            'https://www.carlogos.org/car-logos/lexus-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/Lexus-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/Lexus-Logo.png',
            'https://logo.clearbit.com/lexus.com'
        ],
        'chevrolet': [
            'https://www.carlogos.org/car-logos/chevrolet-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/Chevrolet-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/Chevrolet-Logo.png',
            'https://logo.clearbit.com/chevrolet.com'
        ],
        'mercedes': [
            'https://www.carlogos.org/car-logos/mercedes-benz-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/Mercedes-Benz-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo.png',
            'https://logo.clearbit.com/mercedes-benz.com'
        ],
        'gmc': [
            'https://www.carlogos.org/car-logos/gmc-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/GMC-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/GMC-Logo.png',
            'https://logo.clearbit.com/gmc.com'
        ],
        'bmw': [
            'https://www.carlogos.org/car-logos/bmw-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/BMW-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/BMW-Logo.png',
            'https://logo.clearbit.com/bmw.com'
        ],
        'dodge': [
            'https://images.seeklogo.com/logo-png/4/1/dodge-logo-png_seeklogo-42647.png',
            'https://www.carlogos.org/car-logos/dodge-logo-3700x1200.png',
            'https://1000logos.net/wp-content/uploads/2018/02/Dodge-Logo.png',
            'https://logos-world.net/wp-content/uploads/2020/05/Dodge-Logo.png'
        ]
    };
    
    const logoItems = document.querySelectorAll('.logo-item');
    
    logoItems.forEach(item => {
        const brand = item.getAttribute('data-brand');
        const img = item.querySelector('img');
        if (!img || !brand) return;
        
        const urls = logoConfigs[brand] || [];
        let currentIndex = 0;
        let timeoutId = null;
        
        function tryNextUrl() {
            if (currentIndex >= urls.length) {
                // All URLs failed, show text
                img.style.display = 'none';
                if (!item.querySelector('.logo-text')) {
                    const textDiv = document.createElement('div');
                    textDiv.className = 'logo-text';
                    textDiv.textContent = brand.toUpperCase();
                    item.appendChild(textDiv);
                }
                return;
            }
            
            const url = urls[currentIndex];
            const testImg = new Image();
            
            // Clear any existing timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            
            // Set timeout for this attempt
            timeoutId = setTimeout(function() {
                if (!testImg.complete || testImg.naturalWidth === 0) {
                    currentIndex++;
                    tryNextUrl();
                }
            }, 2000);
            
            testImg.onload = function() {
                if (timeoutId) clearTimeout(timeoutId);
                img.src = url;
                img.style.display = 'block';
            };
            
            testImg.onerror = function() {
                if (timeoutId) clearTimeout(timeoutId);
                currentIndex++;
                tryNextUrl();
            };
            
            testImg.src = url;
        }
        
        // Start loading
        tryNextUrl();
    });
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLogos();
    initSearch();
    initFilters();
    initQuickNavToggle();
    initNavigation();
    initCategoryCards();
    initListingCards();
    initSmoothScroll();
    initMobileMenu();
    initLanguageToggle();
    initSlider();
});

// Search Functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }

    // Enter key press in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim();
        const filterDropdown = document.getElementById('filterAll');
        const selectedCategory = filterDropdown ? filterDropdown.value : '';
        
        // If there's a search query, navigate to search.html
        if (query) {
            let searchUrl = 'search.html?q=' + encodeURIComponent(query);
            if (selectedCategory) {
                searchUrl += '&category=' + encodeURIComponent(selectedCategory);
            }
            window.location.href = searchUrl;
            return;
        }
        
        // Otherwise, use the filter function to apply filters on current page
        if (typeof applyFilters === 'function') {
            applyFilters();
        } else {
            // Fallback if filters not initialized yet
            const listings = document.querySelectorAll('.listing-item');
            let visibleCount = 0;

            listings.forEach(listing => {
                const listingCategory = listing.getAttribute('data-category') || '';
                const matchesCategory = !selectedCategory || listingCategory === selectedCategory;
                
                if (matchesCategory) {
                    listing.style.display = 'flex';
                    visibleCount++;
                } else {
                    listing.style.display = 'none';
                }
            });

            if (typeof updateNoResultsMessage === 'function') {
                updateNoResultsMessage(visibleCount);
            }
        }
    }
    
    // Make performSearch available globally for filter function
    window.performSearch = performSearch;
}

// Filter Functionality
function initFilters() {
    const filterDropdown = document.getElementById('filterAll');
    const filterBtn = document.getElementById('filterBtn');
    const listings = document.querySelectorAll('.listing-item');
    const corporateLogos = document.querySelectorAll('.logo-item');

    // Filter button click
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            applyFilters();
        });
    }

    // Filter dropdown change
    if (filterDropdown) {
        filterDropdown.addEventListener('change', function() {
            applyFilters();
        });
    }

    // Corporate logo click - filter by brand
    corporateLogos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            const brand = this.getAttribute('data-brand');
            filterByBrand(brand);
        });
    });

    function applyFilters() {
        const selectedCategory = filterDropdown ? filterDropdown.value : '';
        const searchInput = document.querySelector('.search-input');
        const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const allListings = document.querySelectorAll('.listing-item');
        let visibleCount = 0;

        allListings.forEach(listing => {
            const listingCategory = listing.getAttribute('data-category') || '';
            const title = listing.querySelector('.listing-title').textContent.toLowerCase();
            
            const matchesCategory = !selectedCategory || listingCategory === selectedCategory;
            const matchesQuery = !searchQuery || title.includes(searchQuery);
            
            if (matchesCategory && matchesQuery) {
                listing.style.display = 'flex';
                visibleCount++;
            } else {
                listing.style.display = 'none';
            }
        });

        updateNoResultsMessage(visibleCount);
    }
    
    // Make applyFilters available globally
    window.applyFilters = applyFilters;

    function filterByBrand(brand) {
        const listings = document.querySelectorAll('.listing-item');
        let visibleCount = 0;

        listings.forEach(listing => {
            const listingBrand = listing.getAttribute('data-brand') || '';
            
            if (listingBrand === brand) {
                listing.style.display = 'flex';
                visibleCount++;
            } else {
                listing.style.display = 'none';
            }
        });

        updateNoResultsMessage(visibleCount);
    }

    function updateNoResultsMessage(visibleCount) {
        const listingsSection = document.querySelector('.listings-section');
        if (!listingsSection) return;
        
        let noResultsMsg = listingsSection.querySelector('.no-results');
        
        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.style.textAlign = 'center';
                noResultsMsg.style.padding = '40px';
                noResultsMsg.style.color = '#666';
                noResultsMsg.innerHTML = '<p>لم يتم العثور على نتائج</p>';
                const listingsList = listingsSection.querySelector('.listings-list');
                if (listingsList) {
                    listingsList.appendChild(noResultsMsg);
                }
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
    
    // Make updateNoResultsMessage available globally
    window.updateNoResultsMessage = updateNoResultsMessage;
}

// Quick Navigation Toggle
function initQuickNavToggle() {
    const toggleBtn = document.getElementById('quickNavToggle');
    const logosContainer = document.getElementById('corporateLogos');
    
    if (toggleBtn && logosContainer) {
        let isExpanded = true;
        
        toggleBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                logosContainer.classList.remove('collapsed');
                toggleBtn.innerHTML = '<i class="bi bi-dash"></i>';
            } else {
                logosContainer.classList.add('collapsed');
                toggleBtn.innerHTML = '<i class="bi bi-plus"></i>';
            }
        });
    }
}

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Category Cards Interaction
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            console.log('Category selected:', categoryName);
            
            // Update search category
            const searchCategory = document.querySelector('.search-category');
            if (searchCategory) {
                // Map category names to values (simplified)
                const categoryMap = {
                    'السيارات': 'cars',
                    'عقارات': 'real-estate',
                    'أجهزة': 'electronics',
                    'أثاث': 'furniture',
                    'ملابس': 'clothes',
                    'حيوانات': 'animals',
                    'خدمات': 'services',
                    'وظائف': 'jobs'
                };
                
                const categoryValue = categoryMap[categoryName];
                if (categoryValue) {
                    searchCategory.value = categoryValue;
                }
            }
            
            // Scroll to search section
            const searchSection = document.querySelector('.search-section');
            if (searchSection) {
                searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                searchSection.querySelector('.search-input')?.focus();
            }
        });
    });
}

// Listing Cards Interaction
function initListingCards() {
    const listingCards = document.querySelectorAll('.listing-card');
    
    listingCards.forEach(card => {
        card.addEventListener('click', function() {
            const listingTitle = this.querySelector('.listing-title').textContent;
            console.log('Listing clicked:', listingTitle);
            
            // In a real application, this would navigate to listing details
            // For now, we'll just log it
        });
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Mobile Menu Toggle (for smaller screens)
function initMobileMenu() {
    // Create mobile menu button if needed
    const nav = document.querySelector('.main-nav');
    if (nav && window.innerWidth <= 768) {
        // Add mobile menu functionality if needed
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.overflowX = 'auto';
        }
    }
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Add Post Ad Button Functionality
const postAdBtn = document.querySelector('.btn-post-ad');
if (postAdBtn) {
    postAdBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real application, this would navigate to post ad page
        alert('سيتم توجيهك إلى صفحة إضافة إعلان جديد');
    });
}

// Login/Register Button Functionality
const loginBtn = document.querySelector('.btn-login');
const registerBtn = document.querySelector('.btn-register');

if (loginBtn) {
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real application, this would open login modal or navigate to login page
        alert('صفحة تسجيل الدخول');
    });
}

if (registerBtn) {
    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real application, this would open register modal or navigate to register page
        alert('صفحة إنشاء حساب جديد');
    });
}

// View All Links
const viewAllLinks = document.querySelectorAll('.view-all');
viewAllLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionTitle = this.closest('.listings-section')
            .querySelector('.section-title').textContent;
        console.log('View all:', sectionTitle);
        // In a real application, this would navigate to all listings page
    });
});

// Footer Links
const footerLinks = document.querySelectorAll('.footer-section a');
footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const linkText = this.textContent;
        console.log('Footer link clicked:', linkText);
        // In a real application, this would navigate to the respective page
    });
});

// Social Media Links
const socialLinks = document.querySelectorAll('.social-icon');
socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // In a real application, this would open social media pages
        console.log('Social media link clicked');
    });
});

// Lazy Loading for Images (if images are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if there are images with data-src
if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyLoadImages();
}

// Add loading animation for cards
function addLoadingAnimation() {
    const cards = document.querySelectorAll('.listing-card, .category-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Run loading animation on page load
window.addEventListener('load', function() {
    addLoadingAnimation();
});

// Language Toggle Functionality
function initLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // In a real application, this would change the language
            console.log('Language changed to:', lang);
            
            // For demo purposes, we'll just log it
            if (lang === 'en') {
                // Would switch to English version
                console.log('Switching to English...');
            } else {
                // Would switch to Arabic version
                console.log('Switching to Arabic...');
            }
        });
    });
}

// Slider Functionality
function initSlider() {
    const sliderTrack = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!sliderTrack || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-play slider
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Responsive adjustments
window.addEventListener('resize', function() {
    // Adjust layout on resize if needed
    const nav = document.querySelector('.main-nav');
    if (nav && window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.style.overflowX = 'auto';
        }
    }
});

