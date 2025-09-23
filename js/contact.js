const btn = document.getElementById('button');
const form = document.getElementById('form'); // store form reference

form.addEventListener('submit', function(event) {
  event.preventDefault();

  btn.value = 'Sending...';

  const serviceID = 'default_service';
  const templateID = 'template_ro1un69';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
      form.reset(); // use stored reference to reset the form
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
