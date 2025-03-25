document.addEventListener('DOMContentLoaded', () => {
    // Modal Elements
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    // Open Modal Function
    function openModal(imgSrc) {
        modal.style.display = 'flex'; // Flex for centering
        modalImage.src = imgSrc;
        modal.classList.add('fade-in'); // Smooth animation
    }

    // Close Modal Function
    function closeModal() {
        modal.classList.remove('fade-in');
        setTimeout(() => modal.style.display = 'none', 300); // Delay to match animation
    }

    // Attach event listeners to product images
    document.querySelectorAll('.product-card img').forEach(image => {
        image.addEventListener('click', () => openModal(image.src));
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Newsletter Subscription Handling
    const newsletterForm = document.querySelector('.newsletter form');
    
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value.trim();

        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const result = await response.json();
            alert(result.message || 'Thank you for subscribing!');

            // Clear the input field after success
            emailInput.value = '';
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Failed to subscribe. Please try again later.');
        }
    });
});
