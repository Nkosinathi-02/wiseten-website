document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.loading-spinner');
            
            // Show loading state
            btnText.textContent = 'Sending...';
            spinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    btnText.textContent = 'Sent Successfully!';
                    formMessage.textContent = 'Thank you! We\'ll get back to you soon.';
                    formMessage.style.color = 'green';
                    form.reset();
                    
                    // Redirect after success
                    setTimeout(() => {
                        window.location.href = 'thank-you.html';
                    }, 2000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                btnText.textContent = 'Send Quote Request';
                formMessage.textContent = 'Error sending message. Please try again.';
                formMessage.style.color = 'red';
            } finally {
                spinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
    }
});