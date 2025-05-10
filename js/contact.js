document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    let contactData = JSON.parse(localStorage.getItem('contactData')) || [];
    contactData.push({ name, email, message, timestamp: new Date().toISOString() });
    localStorage.setItem('contactData', JSON.stringify(contactData));

    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});