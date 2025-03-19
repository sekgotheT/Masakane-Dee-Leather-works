// payment.js
const stripe = Stripe('your-publishable-key-here');  // Replace with your Stripe publishable key

const paymentForm = document.getElementById('paymentForm');
const payButton = document.getElementById('payButton');
const paymentStatus = document.getElementById('paymentStatus');
const paymentResult = document.getElementById('paymentResult');
const paymentMessage = document.getElementById('paymentMessage');

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    // Show the "Processing" message
    paymentStatus.classList.remove('hidden');
    
    try {
        // Call the server to create a payment session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                amount,  // Amount in dollars
            }),
        });

        const session = await response.json();

        if (session.id) {
            // Redirect to Stripe Checkout page
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            if (result.error) {
                paymentMessage.textContent = `Error: ${result.error.message}`;
                paymentResult.classList.remove('hidden');
            }
        }
    } catch (error) {
        paymentMessage.textContent = `Payment failed: ${error.message}`;
        paymentResult.classList.remove('hidden');
    } finally {
        // Hide the "Processing" message
        paymentStatus.classList.add('hidden');
    }
});
