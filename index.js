        document.addEventListener('DOMContentLoaded', function() {
            console.log('Haraj Souq page loaded');
        
            const searchInput = document.querySelector('.search-bar input');
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    alert('بحث عن: ' + this.value);
                }
            });
        });