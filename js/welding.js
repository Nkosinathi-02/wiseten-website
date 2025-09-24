// Update the setupSmoothScrolling function in products.js
function setupSmoothScrolling() {
    // Update category card links to go to dedicated pages
    document.querySelectorAll('.category-card a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Redirect to dedicated category pages
            switch(targetId) {
                case 'welding':
                    window.location.href = 'welding.html';
                    break;
                case 'gas-equipment':
                    window.location.href = 'gas-equipment.html';
                    break;
                case 'plasma-laser':
                    window.location.href = 'plasma-laser.html';
                    break;
                case 'generators':
                    window.location.href = 'generators.html';
                    break;
                case 'tools-ppe':
                    window.location.href = 'tools-ppe.html';
                    break;
                case 'bevelling':
                    window.location.href = 'bevelling.html';
                    break;
                default:
                    // Smooth scroll for same-page anchors
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
            }
        });
    });
}