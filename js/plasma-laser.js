// Plasma & Laser Cutting Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize plasma laser page
    initPlasmaLaserPage();
});

function initPlasmaLaserPage() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize plasma laser-specific functionality
    initPlasmaLaserAnimations();
    
    // Initialize cutting calculator
    initCuttingCalculator();
}

function initPlasmaLaserAnimations() {
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

function initCuttingCalculator() {
    // Initialize cutting capacity calculator
    console.log('Cutting capacity calculator initialized');
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

// Plasma Laser specific utility functions
function calculateCuttingCapacity(material, thickness) {
    // Function to help users calculate cutting capacity needed
    const capacityGuide = {
        'plasma': {
            'mild_steel': 'Up to 80mm',
            'stainless_steel': 'Up to 50mm',
            'aluminum': 'Up to 40mm'
        },
        'fiber_laser': {
            'mild_steel': 'Up to 25mm',
            'stainless_steel': 'Up to 20mm',
            'aluminum': 'Up to 15mm'
        },
        'co2_laser': {
            'acrylic': 'Up to 50mm',
            'wood': 'Up to 30mm',
            'plastic': 'Up to 25mm'
        }
    };
    
    return capacityGuide;
}

function getCuttingSpecifications(type) {
    // Function to fetch cutting equipment specifications
    const specifications = {
        'plasma': {
            power: '40A-400A',
            speed: 'Up to 10m/min',
            accuracy: '±0.5mm'
        },
        'fiber_laser': {
            power: '1kW-12kW',
            speed: 'Up to 50m/min',
            accuracy: '±0.1mm'
        },
        'co2_laser': {
            power: '500W-6000W',
            speed: 'Up to 30m/min',
            accuracy: '±0.2mm'
        }
    };
    
    return specifications[type] || {};
}