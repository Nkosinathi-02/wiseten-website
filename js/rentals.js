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