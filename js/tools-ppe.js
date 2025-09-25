// Tools & PPE Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tools ppe page
    initToolsPPEPage();
});

function initToolsPPEPage() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize tools ppe-specific functionality
    initToolsPPEAnimations();
    
    // Initialize safety calculator
    initSafetyCalculator();
}

function initToolsPPEAnimations() {
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

function initSafetyCalculator() {
    // Initialize PPE requirements calculator
    console.log('PPE requirements calculator initialized');
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

// Tools & PPE specific utility functions
function calculatePPERequirements(workType, hazards) {
    // Function to help users calculate PPE requirements
    const ppeRequirements = {
        'welding': ['Welding helmet', 'Fire-resistant clothing', 'Welding gloves', 'Safety glasses'],
        'construction': ['Hard hat', 'Safety boots', 'Hi-vis vest', 'Safety glasses'],
        'chemical': ['Chemical suit', 'Respirator', 'Chemical gloves', 'Safety goggles'],
        'electrical': ['Voltage-rated gloves', 'Arc flash suit', 'Insulated tools', 'Safety glasses']
    };
    
    return ppeRequirements[workType] || ['Basic PPE kit'];
}

function getToolSpecifications(category) {
    // Function to fetch tool specifications
    const specifications = {
        'power_tools': {
            voltage: '12V-36V',
            battery: 'Lithium-Ion',
            warranty: '1-3 years'
        },
        'hand_tools': {
            material: 'Chrome Vanadium',
            finish: 'Chrome Plated',
            warranty: 'Lifetime'
        },
        'ppe': {
            standards: 'ANSI/OSHA',
            certification: 'CE Marked',
            comfort: 'Adjustable'
        }
    };
    
    return specifications[category] || {};
}