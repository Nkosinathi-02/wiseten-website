// Function to load footer
function loadFooter() {
    // Determine the correct path based on current page location
    let footerPath;
    
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('contact') || 
        currentPath.includes('about') ||
        currentPath.includes('services') ||
        currentPath.includes('products') ||
        currentPath.includes('rentals') ) {
        footerPath = '../components/footer.html';
    } else {
        footerPath = 'components/footer.html';
    }
    
    fetch(footerPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            // Fallback footer
            document.getElementById('footer-container').innerHTML = `
                <footer class="footer">
                    <div class="container">
                        <div class="footer-bottom">
                            <p>&copy; 2023 Wiseten Company. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            `;
        });
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);