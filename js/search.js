// Search Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const categoryFilter = urlParams.get('category');
    
    // Set search input value if query exists
    const searchInput = document.getElementById('searchInput');
    if (searchInput && searchQuery) {
        searchInput.value = decodeURIComponent(searchQuery);
    }
    
    // Filter listings based on search query and category
    if (searchQuery || categoryFilter) {
        filterListings(searchQuery, categoryFilter);
    }
    
    // Search button functionality
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // Enter key in search input
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            let searchUrl = 'search.html?q=' + encodeURIComponent(query);
            window.location.href = searchUrl;
        }
    }
    
    function filterListings(query, category) {
        const listings = document.querySelectorAll('.list-group-item');
        let visibleCount = 0;
        
        listings.forEach(listing => {
            const title = listing.querySelector('.item-title').textContent.toLowerCase();
            const listingCategory = listing.getAttribute('data-category') || '';
            
            const matchesQuery = !query || title.includes(query.toLowerCase());
            const matchesCategory = !category || listingCategory === category;
            
            if (matchesQuery && matchesCategory) {
                listing.style.display = 'flex';
                visibleCount++;
            } else {
                listing.style.display = 'none';
            }
        });
        
        // Show no results message if needed
        if (visibleCount === 0) {
            showNoResults();
        } else {
            hideNoResults();
        }
    }
    
    function showNoResults() {
        const container = document.querySelector('.container .row');
        if (container && !container.querySelector('.no-results')) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results text-center p-5';
            noResults.innerHTML = '<p class="text-muted">لم يتم العثور على نتائج</p>';
            container.appendChild(noResults);
        }
    }
    
    function hideNoResults() {
        const noResults = document.querySelector('.no-results');
        if (noResults) {
            noResults.remove();
        }
    }
});

