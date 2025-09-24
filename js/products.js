// Products Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize products page
    initProductsPage();
    
    // Initialize mobile menu
    initMobileMenu();
});



function initProductsPage() {
    // Load products for each category
    loadProductsByCategory();
    
    // Set active navigation link
    setActiveNavLink();
    
    // Smooth scrolling for category links
    setupSmoothScrolling();
}

function loadProductsByCategory() {
    // Load welding equipment
    displayProducts('welding', productsData.welding);
    
    // Load gas equipment
    displayProducts('gas-equipment', productsData.gasEquipment);
    
    // Load plasma & laser cutting
    displayProducts('plasma-laser', productsData.plasmaLaser);
    
    // Load generators
    displayProducts('generators', productsData.generators);
    
    // Load tools & PPE
    displayProducts('tools-ppe', productsData.toolsPpe);
    
    // Load bevelling equipment
    displayProducts('bevelling', productsData.bevelling);
}

function displayProducts(categoryId, products) {
    const productsGrid = document.querySelector(`#${categoryId} .products-grid`);
    
    if (!productsGrid) return;
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products available in this category.</div>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(categoryId)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-specs">
                    ${product.specs.map(spec => `
                        <div class="product-spec">
                            <i class="${spec.icon}"></i> ${spec.text}
                        </div>
                    `).join('')}
                </div>
                <div class="product-price">${product.price}</div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(categoryId) {
    const categories = {
        'welding': 'Welding Equipment',
        'gas-equipment': 'Gas Equipment',
        'plasma-laser': 'Plasma & Laser Cutting',
        'generators': 'Generators',
        'tools-ppe': 'Hand & Power Tools & PPE',
        'bevelling': 'Bevelling Equipment'
    };
    return categories[categoryId] || categoryId;
}

function setupSmoothScrolling() {
    // Smooth scrolling for category navigation
    document.querySelectorAll('.category-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
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