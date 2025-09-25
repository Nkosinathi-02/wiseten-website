// Bevelling Equipment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize bevelling page
    initBevellingPage();
});

function initBevellingPage() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize bevelling-specific functionality
    initBevellingAnimations();
    
    // Initialize bevelling calculator
    initBevellingCalculator();
}

function initBevellingAnimations() {
    // Add scroll animations for product cards
    const productCards = document.querySelectorAll('.product-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

function initBevellingCalculator() {
    // Initialize bevelling requirements calculator
    console.log('Bevelling requirements calculator initialized');
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage) {
            link.classList.add('active');
        }
    });
}

// Bevelling specific utility functions
function calculateBevellingRequirements(material, thickness, angle) {
    // Function to help users calculate bevelling requirements
    const requirements = {
        'steel': {
            '5mm': 'Portable Beveller',
            '20mm': 'Plate Beveller',
            '50mm': 'Heavy Duty Beveller'
        },
        'stainless': {
            '5mm': 'Stainless Beveller',
            '20mm': 'Specialized Beveller',
            '50mm': 'CNC Beveller'
        },
        'aluminum': {
            '5mm': 'Aluminum Beveller',
            '20mm': 'High Speed Beveller',
            '50mm': 'Coolant System'
        }
    };
    
    return requirements[material]?.[thickness] || 'Consult our experts';
}

function getBevellingSpecifications(type) {
    // Function to fetch bevelling equipment specifications
    const specifications = {
        'portable': {
            weight: '3-40 kg',
            power: 'Electric/Pneumatic',
            angles: '15-45°'
        },
        'stationary': {
            capacity: 'Up to 200mm',
            control: 'Manual/CNC',
            speed: 'Variable'
        },
        'specialized': {
            materials: 'Specific Alloys',
            precision: 'High Accuracy',
            features: 'Special Blades'
        }
    };
    
    return specifications[type] || {};
}