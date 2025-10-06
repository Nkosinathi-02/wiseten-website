function initRentalForm() {
    // Handle rental inquiry form submission
    const inquiryForm = document.querySelector('.inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const inquiryData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                equipment: this.querySelector('select').value,
                message: this.querySelector('textarea').value
            };
            
            // Validate form data
            if (validateRentalForm(inquiryData)) {
                // Submit the form
                submitRentalInquiry(inquiryData);
            }
        });
    }
}

function validateRentalForm(data) {
    // Simple validation
    if (!data.name.trim()) {
        showFormError('Please enter your name');
        return false;
    }
    
    if (!data.email.trim() || !isValidEmail(data.email)) {
        showFormError('Please enter a valid email address');
        return false;
    }
    
    if (!data.phone.trim()) {
        showFormError('Please enter your phone number');
        return false;
    }
    
    if (!data.equipment) {
        showFormError('Please select an equipment type');
        return false;
    }
    
    if (!data.message.trim()) {
        showFormError('Please enter your rental requirements');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and display error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
    `;
    errorDiv.textContent = message;
    
    const form = document.querySelector('.inquiry-form');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

function submitRentalInquiry(inquiryData) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Here you would typically send data to your server
        console.log('Rental inquiry submitted:', inquiryData);
        
        // Show success message
        showFormSuccess('Thank you! Your rental inquiry has been sent. We will contact you within 24 hours.');
        
        // Reset form
        document.querySelector('.inquiry-form').reset();
        
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track the inquiry (optional)
        trackRentalInquiry(inquiryData);
        
    }, 1500);
}

function showFormSuccess(message) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-success');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create and display success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 20px;
        border: 1px solid #c3e6cb;
    `;
    successDiv.textContent = message;
    
    const form = document.querySelector('.inquiry-form');
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove success message after 8 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 8000);
}

function trackRentalInquiry(inquiryData) {
    // Track rental inquiries for analytics (optional)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'rental_inquiry', {
            'event_category': 'rentals',
            'event_label': inquiryData.equipment,
            'value': 1
        });
    }
    
    // You can also store in localStorage for basic tracking
    const inquiries = JSON.parse(localStorage.getItem('rentalInquiries') || '[]');
    inquiries.push({
        ...inquiryData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('rentalInquiries', JSON.stringify(inquiries));
}

// Equipment availability check
function checkEquipmentAvailability() {
    // This would typically call an API to check real-time availability
    const rentalCards = document.querySelectorAll('.rental-card');
    
    rentalCards.forEach(card => {
        const equipmentName = card.querySelector('h3').textContent;
        const badge = card.querySelector('.rental-badge');
        
        // Simulate availability check (replace with actual API call)
        const isAvailable = Math.random() > 0.2; // 80% chance available
        
        if (!isAvailable) {
            const unavailableBadge = document.createElement('div');
            unavailableBadge.className = 'rental-badge unavailable';
            unavailableBadge.textContent = 'Unavailable';
            unavailableBadge.style.cssText = `
                position: absolute;
                top: 15px;
                right: 15px;
                background: #6c757d;
                color: white;
                padding: 5px 10px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
            `;
            
            card.querySelector('.rental-image').appendChild(unavailableBadge);
            card.querySelector('.rental-btn').disabled = true;
            card.querySelector('.rental-btn').textContent = 'Currently Unavailable';
            card.querySelector('.rental-btn').style.background = '#6c757d';
        }
    });
}

// Price calculator functionality
function initPriceCalculator() {
    // Add price calculator to rental cards
    const rentalCards = document.querySelectorAll('.rental-card');
    
    rentalCards.forEach(card => {
        const dailyPrice = parseFloat(card.querySelector('.amount').textContent.replace('R', ''));
        const weeklyPrice = parseFloat(card.querySelectorAll('.amount')[1].textContent.replace('R', ''));
        
        // Create calculator UI
        const calculatorHtml = `
            <div class="price-calculator" style="margin-top: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                <label style="display: block; margin-bottom: 5px; font-size: 0.9rem;">Calculate cost for:</label>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <input type="number" min="1" max="365" value="1" style="width: 60px; padding: 5px; border: 1px solid #ddd; border-radius: 3px;">
                    <span style="font-size: 0.9rem;">days</span>
                    <button class="calculate-btn" style="padding: 5px 10px; background: #28a745; color: white; border: none; border-radius: 3px; cursor: pointer;">Calculate</button>
                </div>
                <div class="calculation-result" style="margin-top: 10px; font-weight: bold; color: #007bff;"></div>
            </div>
        `;
        
        card.querySelector('.rental-info').insertAdjacentHTML('beforeend', calculatorHtml);
        
        // Add calculate functionality
        const calculateBtn = card.querySelector('.calculate-btn');
        const daysInput = card.querySelector('input[type="number"]');
        const resultDiv = card.querySelector('.calculation-result');
        
        calculateBtn.addEventListener('click', function() {
            const days = parseInt(daysInput.value);
            if (days > 0) {
                const cost = calculateRentalCost(days, dailyPrice, weeklyPrice);
                resultDiv.textContent = `Estimated cost: R${cost.toFixed(2)}`;
            }
        });
    });
}

function calculateRentalCost(days, dailyRate, weeklyRate) {
    if (days >= 7) {
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;
        return (weeks * weeklyRate) + (remainingDays * dailyRate);
    }
    return days * dailyRate;
}

// Enhanced initialization
function initRentalsPage() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize rental functionality
    initRentalButtons();
    initSmoothScrolling();
    initRentalForm();
    
    // Additional functionality
    checkEquipmentAvailability();
    initPriceCalculator();
    
    // Add scroll animations
    initScrollAnimations();
}

function initScrollAnimations() {
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe rental cards and sections
    document.querySelectorAll('.rental-card, .category-card, .benefit-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Export functions for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRentalsPage,
        validateRentalForm,
        calculateRentalCost
    };
}
// Add click event listeners to all rental buttons
document.addEventListener('DOMContentLoaded', function() {
    const rentalButtons = document.querySelectorAll('.rental-btn');
    
    rentalButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'request-quote.html';
        });
    });
});

// Add this to your existing rentals.js file or in the script section

// Update the search functionality to include plasma-cutting category
document.addEventListener('DOMContentLoaded', function() {
    // Your existing search code...
    
    // Update category filter options in code (already done in HTML)
    const categoryFilter = document.getElementById('categoryFilter');
    // The HTML update should handle this, but you can also update programmatically if needed
    
    // Add plasma-cutting products to the search index
    const plasmaCuttingProducts = [
        {
            name: "Handheld Plasma Cutters",
            description: "Portable plasma cutting systems for on-site work and maintenance applications",
            specs: ["40A-100A", "Up to 25mm", "Portable"],
            category: "plasma-cutting",
            type: "handheld",
            power: "medium"
        },
        {
            name: "CNC Plasma Tables", 
            description: "Computer-controlled plasma cutting systems for precision and repeatability",
            specs: ["CNC Control", "Up to 50mm", "Various Sizes"],
            category: "plasma-cutting",
            type: "cnc",
            power: "industrial"
        },
        {
            name: "Fiber Laser Cutters",
            description: "High-efficiency fiber laser systems for fast, precise cutting of various metals",
            specs: ["1kW-12kW", "Up to 25mm", "High Speed"],
            category: "plasma-cutting", 
            type: "laser",
            power: "high"
        }
    ];

    // Enhanced search functionality that includes plasma-cutting
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const categoryValue = categoryFilter.value;
        const priceValue = priceFilter.value;
        const availabilityValue = availabilityFilter.value;
        
        let visibleCount = 0;
        let totalCount = 0;
        
        // Reset all rental cards to visible (including plasma-cutting ones)
        const allRentalCards = document.querySelectorAll('.rental-card');
        allRentalCards.forEach(card => {
            card.classList.remove('hidden');
            card.classList.remove('search-match');
            
            // Remove previous highlights
            const elements = card.querySelectorAll('h3, p, .rental-specs span');
            elements.forEach(el => {
                el.innerHTML = el.innerHTML.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
            });
        });
        
        // Filter rental cards (now includes plasma-cutting)
        allRentalCards.forEach(card => {
            totalCount++;
            
            const productTitle = card.querySelector('h3').textContent.toLowerCase();
            const productDescription = card.querySelector('p').textContent.toLowerCase();
            const productSpecs = Array.from(card.querySelectorAll('.rental-specs span'))
                .map(span => span.textContent.toLowerCase())
                .join(' ');
            
            const productText = productTitle + ' ' + productDescription + ' ' + productSpecs;
            
            // Get category from parent section
            const parentSection = card.closest('.rental-section');
            const category = parentSection ? parentSection.dataset.category : 'unknown';
            
            const categoryMatch = categoryValue === 'all' || category === categoryValue;
            const priceMatch = priceValue === 'all' || card.dataset.price === priceValue;
            const availabilityMatch = availabilityValue === 'all' || card.dataset.availability === availabilityValue;
            const searchMatch = searchTerm === '' || productText.includes(searchTerm);
            
            if (categoryMatch && priceMatch && availabilityMatch && searchMatch) {
                visibleCount++;
                
                // Highlight search term if present
                if (searchTerm !== '') {
                    highlightText(card, searchTerm);
                    card.classList.add('search-match');
                }
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Update rental sections visibility (including plasma-cutting section)
        const allRentalSections = document.querySelectorAll('.rental-section');
        allRentalSections.forEach(section => {
            const hasVisibleCards = Array.from(section.querySelectorAll('.rental-card'))
                .some(card => !card.classList.contains('hidden'));
            
            if (hasVisibleCards) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        
        // Update results info
        if (searchTerm !== '' || categoryValue !== 'all' || priceValue !== 'all' || availabilityValue !== 'all') {
            searchResultsInfo.textContent = `Showing ${visibleCount} of ${totalCount} rental items`;
            
            if (visibleCount === 0) {
                searchResultsInfo.innerHTML = `No rental equipment found matching your criteria. <a href="#" id="resetSearch">Reset filters</a>`;
                
                const resetBtn = document.getElementById('resetSearch');
                if (resetBtn) {
                    resetBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        resetFilters();
                    });
                }
            }
        } else {
            searchResultsInfo.textContent = '';
        }
    }

    // Initialize plasma-cutting section animations
    function initPlasmaCuttingAnimations() {
        const plasmaSection = document.getElementById('plasma-cutting-rentals');
        if (plasmaSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            const plasmaCards = plasmaSection.querySelectorAll('.rental-card');
            plasmaCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        }
    }

    // Call initialization for plasma-cutting section
    initPlasmaCuttingAnimations();
});

// Additional utility functions for plasma-cutting equipment
function getPlasmaCuttingEquipment() {
    return [
        {
            id: 'handheld-plasma',
            name: 'Handheld Plasma Cutters',
            category: 'plasma-cutting',
            dailyRate: 950,
            weeklyRate: 5200,
            specs: {
                power: '40A-100A',
                thickness: 'Up to 25mm',
                weight: 'Portable',
                voltage: '220V/380V'
            }
        },
        {
            id: 'cnc-plasma',
            name: 'CNC Plasma Tables', 
            category: 'plasma-cutting',
            dailyRate: 2500,
            weeklyRate: 12500,
            specs: {
                control: 'CNC',
                thickness: 'Up to 50mm',
                size: 'Various Sizes',
                features: 'Auto Height, Water Table'
            }
        },
        {
            id: 'fiber-laser',
            name: 'Fiber Laser Cutters',
            category: 'plasma-cutting',
            dailyRate: 3500,
            weeklyRate: 18000,
            specs: {
                power: '1kW-12kW',
                thickness: 'Up to 25mm',
                speed: 'High Speed',
                efficiency: 'Energy Efficient'
            }
        }
    ];
}

// Enhanced equipment tracking
function trackPlasmaRentalInquiry(equipmentName) {
    // Track plasma cutting equipment inquiries
    if (typeof gtag !== 'undefined') {
        gtag('event', 'rental_inquiry', {
            'event_category': 'plasma_cutting',
            'event_label': equipmentName,
            'value': 1
        });
    }
    
    // Store in localStorage
    const plasmaInquiries = JSON.parse(localStorage.getItem('plasmaRentalInquiries') || '[]');
    plasmaInquiries.push({
        equipment: equipmentName,
        timestamp: new Date().toISOString(),
        category: 'plasma-cutting'
    });
    localStorage.setItem('plasmaRentalInquiries', JSON.stringify(plasmaInquiries));
}

// Add click handlers for plasma-cutting rental buttons
document.addEventListener('DOMContentLoaded', function() {
    const plasmaRentalButtons = document.querySelectorAll('#plasma-cutting-rentals .rental-btn');
    
    plasmaRentalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const card = this.closest('.rental-card');
            const equipmentName = card.querySelector('h3').textContent;
            
            // Track the specific plasma equipment inquiry
            trackPlasmaRentalInquiry(equipmentName);
            
            // You can also pass equipment info to the quote page
            const equipmentData = {
                type: 'plasma-cutting',
                name: equipmentName
            };
            
            // Store in sessionStorage for the quote page
            sessionStorage.setItem('rentalEquipment', JSON.stringify(equipmentData));
        });
    });
});

// Price calculation for plasma equipment
function calculatePlasmaRentalCost(days, equipmentType) {
    const equipment = getPlasmaCuttingEquipment().find(item => item.id === equipmentType);
    
    if (!equipment) return 0;
    
    const { dailyRate, weeklyRate } = equipment;
    
    if (days >= 7) {
        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;
        return (weeks * weeklyRate) + (remainingDays * dailyRate);
    }
    
    return days * dailyRate;
}

// Initialize plasma-cutting section when page loads
function initPlasmaCuttingSection() {
    console.log('Plasma & Cutting equipment section initialized');
    
    // Add any plasma-specific initialization here
    const plasmaSection = document.getElementById('plasma-cutting-rentals');
    if (plasmaSection) {
        // Section is properly loaded
        console.log('Plasma cutting section found with', plasmaSection.querySelectorAll('.rental-card').length, 'products');
    }
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlasmaCuttingSection);
} else {
    initPlasmaCuttingSection();
}