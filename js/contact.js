document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'red';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!isValid) {
        formMessage.textContent = 'Please fill in all required fields.';
        formMessage.className = 'form-message error-message';
        return;
      }

      // Show loading state
      const btnText = submitBtn.querySelector('.btn-text');
      const spinner = submitBtn.querySelector('.loading-spinner');
      
      btnText.textContent = 'Sending...';
      spinner.style.display = 'inline-block';
      submitBtn.disabled = true;
      formMessage.textContent = '';
      formMessage.className = 'form-message';

      // Submit form to Web3Forms
      const formData = new FormData(form);
      
      fetch(form.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
          formMessage.className = 'form-message success-message';
          form.reset();
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
        formMessage.className = 'form-message error-message';
      })
      .finally(() => {
        // Reset button state
        btnText.textContent = 'Send Message';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
      });
    });
  }
});