// Gas Equipment Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize gas equipment page
    initGasEquipmentPage();
});

function initGasEquipmentPage() {
    // Set active navigation link
    setActiveNavLink();
    
    // Initialize any gas equipment-specific functionality
    initGasEquipmentAnimations();
}

function initGasEquipmentAnimations() {
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

// Gas equipment specific utility functions
function calculateGasRequirements() {
    // Function to help users calculate their gas equipment needs
    console.log('Gas equipment requirements calculator');
}

function getGasSpecifications(equipmentType) {
    // Function to fetch gas equipment specifications
    const specifications = {
        'regulators': {
            pressure: '0-400 PSI',
            connection: 'CGA Connections',
            material: 'Brass Construction'
        },
        'torches': {
            type: 'Oxygen-Fuel',
            applications: 'Cutting/Welding',
            tips: 'Interchangeable'
        },
        'safety': {
            standards: 'ISO Certified',
            protection: 'Flashback Prevention',
            testing: 'Pressure Tested'
        }
    };
    
    return specifications[equipmentType] || {};
}