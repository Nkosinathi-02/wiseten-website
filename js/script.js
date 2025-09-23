// Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real implementation, you would send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Simple form validation
document.querySelectorAll('input, textarea').forEach(element => {
    element.addEventListener('blur', () => {
        if (!element.value) {
            element.style.borderColor = 'red';
        } else {
            element.style.borderColor = '';
        }
    });
});



