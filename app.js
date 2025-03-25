// Function to handle form submissions with dynamic messages
function handleFormSubmission(formId, message) {
    const form = document.querySelector(formId);
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Simulate processing delay for better UX
            const button = form.querySelector("button[type='submit']");
            button.disabled = true;
            button.textContent = "Processing...";

            setTimeout(() => {
                alert(message);  // Display success message
                button.disabled = false;
                button.textContent = "Submit";  // Reset button text
                form.reset();  // Clear form fields after submission
            }, 1500);
        });
    }
}

// Attach handlers to specific forms
handleFormSubmission("#orderForm", "✅ Order placed successfully!");
handleFormSubmission("#paymentForm", "✅ Payment completed successfully!");
handleFormSubmission("#uploadForm", "✅ Product uploaded successfully!");
