// Inheritance System - Loads navbar and footer on all pages
class PageInheritance {
    constructor() {
        this.pages = {
            'index.html': 'Home',
            'about.html': 'About Us', 
            'services.html': 'Services',
            'products.html': 'Products',
            'rentals.html': 'Rentals',
            'contact.html': 'Contact Us'
        };
    }

    // Load navbar and footer
    async loadComponents() {
        await this.loadNavbar();
        await this.loadFooter();
        this.setActiveLink();
        this.initMobileMenu();
    }

    // Load navbar template
    async loadNavbar() {
        const navbarContainer = document.getElementById('navbar-container');
        if (!navbarContainer) return;

        const navbarHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <a href="index.html">
                            <img src="images/logo.png" alt="Wiseten Company Logo" class="logo-img">
                            <span class="company-name">WISETEN</span>
                        </a>
                    </div>
                    <ul class="nav-menu">
                        ${Object.entries(this.pages).map(([page, title]) => `
                            <li class="nav-item">
                                <a href="${page}" class="nav-link">${title}</a>
                            </li>
                        `).join('')}
                    </ul>
                    <div class="hamburger">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                </div>
            </nav>
        `;
        
        navbarContainer.innerHTML = navbarHTML;
    }

    // Load footer template
    async loadFooter() {
        const footerContainer = document.getElementById('footer-container');
        if (!footerContainer) return;

        const footerHTML = `
            <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><i class="fas fa-building"></i> Wiseten Company</h3>
                    <p>Wiseten Company is a leading provider of welding and construction equipment with years of industry expertise. We're committed to delivering high-quality products and exceptional service to our clients.</p>
                </div>
                <div class="footer-section">
                    <h3><i class="fas fa-address-book"></i> Contact Info</h3>
                    <p><i class="fas fa-phone"></i> <a href="tel:0840262830">Phone: 0840262830/ 0615493309</a></p>
                    <p><i class="fas fa-envelope"></i> <a href="mailto:WisetenEngineering@outlook.com">Email: WisetenEngineering@outlook.com</a></p>
                    <p><i class="fas fa-envelope"></i> <a href="mailto:Phumlank@gmail.com">Email: Phumlank@gmail.com</a></p>
                    <p><i class="fas fa-map-marker-alt"></i> Address: 85 Goodwood Road West Mead, Pinetown 3609</p>
                    <p><i class="fas fa-map-marker-alt"></i> Richards Bay - Ceramic Curve 20 Richard’s Bay , KwaZulu Natal 3900</p>
                </div>
                <div class="footer-section">
                    <h3><i class="fas fa-tools"></i> Our Products</h3>
                    <p><i class="fas fa-bolt"></i> <a href="welding.html">Welding Equipment</a></p>
                    <p><i class="fas fa-gas-pump"></i> <a href="gas-equipment.html">Gas Equipment</a></p>
                     <p><a href="generators.html" class="generator-link">
                    <i class="fas fa-bolt"></i> Generators
                </a></p>
                    <p><i class="fas fa-hard-hat"></i> <a href="products.html#construction">Construction Equipment</a></p>
                    <div class="legal-links">
   <p><i class="fas fa-file-contract"></i> <a href="Documents/conditions.pdf" target="_blank">Terms and Conditions</a></p>
<p><i class="fas fa-user-shield"></i> <a href="Documents/policy.pdf" target="_blank">Privacy Policy</a></p>
    </div>
                </div>
                <div class="footer-section">
                    <h3><i class="fas fa-clock"></i> Operating Hours</h3>
                    <p><i class="fas fa-calendar-alt"></i> Monday - Friday: 07:30 - 16:30</p>
                    <p><i class="fas fa-calendar-alt"></i> Saturday - Sunday: Closed</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p><i class="fas fa-copyright"></i> 2025 Wiseten Company. All rights reserved.</p>
            </div>
        </div>
    </footer>

        `;
        
        footerContainer.innerHTML = footerHTML;
    }

    // Set active link based on current page
    setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage) {
                link.classList.add('active');
            }
        });
    }

    // Initialize mobile menu functionality
    initMobileMenu() {
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
}

// Initialize inheritance when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const inheritance = new PageInheritance();
    inheritance.loadComponents();
});