// Function to open the modal and display the clicked image
function openModal(imgSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImage.src = imgSrc;
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Add event listeners to the product images for the modal
document.querySelectorAll('.product-card img').forEach(image => {
    image.addEventListener('click', () => openModal(image.src));
});

// Handle the form submission for the newsletter subscription
document.querySelector('.newsletter form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Example of handling form submission (you can integrate with an API)
    alert(`Thank you for subscribing, ${email}!`);

    // Clear the form after submission
    e.target.querySelector('input[type="email"]').value = '';
});
