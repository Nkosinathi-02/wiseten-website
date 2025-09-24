// Generators Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize generators page
    initGeneratorsPage();
});

function initGeneratorsPage() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize generators-specific functionality
    initGeneratorsAnimations();
    
    // Initialize power calculator
    initPowerCalculator();
}

function initGeneratorsAnimations() {
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

function initPowerCalculator() {
    // Initialize generator sizing calculator
    console.log('Generator power calculator initialized');
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

// Generator specific utility functions
function calculateGeneratorSize(powerRequirements) {
    // Function to help users calculate generator size needed
    const sizingGuide = {
        'residential': '5-20kVA',
        'commercial': '20-200kVA',
        'industrial': '200-2000kVA',
        'construction': '50-500kVA'
    };
    
    return sizingGuide[powerRequirements] || 'Consult our experts';
}

function getGeneratorSpecifications(type) {
    // Function to fetch generator specifications
    const specifications = {
        'diesel': {
            fuel: 'Diesel',
            runtime: '8-24 hours',
            maintenance: '500-1000 hours'
        },
        'gas': {
            fuel: 'Natural Gas/LPG',
            runtime: 'Continuous',
            maintenance: '1000-2000 hours'
        },
        'petrol': {
            fuel: 'Petrol',
            runtime: '4-8 hours',
            maintenance: '100-200 hours'
        }
    };
    
    return specifications[type] || {};
}