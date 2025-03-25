const stripe = Stripe('your-publishable-key-here');  // Replace with your Stripe publishable key

const paymentForm = document.getElementById('paymentForm');
const payButton = document.getElementById('payButton');
const paymentStatus = document.getElementById('paymentStatus');
const paymentResult = document.getElementById('paymentResult');
const paymentMessage = document.getElementById('paymentMessage');

// Disable the button initially to prevent multiple submissions
payButton.disabled = false;

paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const amount = document.getElementById('amount').value;

    // Basic client-side validation
    if (!name || !email || !amount || isNaN(amount) || amount <= 0) {
        alert("Please provide valid name, email, and amount.");
        return;
    }

    // Show the "Processing" message and disable the button
    paymentStatus.classList.remove('hidden');
    payButton.disabled = true;

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
        } else {
            throw new Error('Session creation failed. Please try again.');
        }
    } catch (error) {
        paymentMessage.textContent = `Payment failed: ${error.message}`;
        paymentResult.classList.remove('hidden');
    } finally {
        // Hide the "Processing" message and enable the button again
        paymentStatus.classList.add('hidden');
        payButton.disabled = false;
    }
});
