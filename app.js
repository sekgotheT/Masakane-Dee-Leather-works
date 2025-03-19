document.getElementById("orderForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Order placed successfully!");
});

document.getElementById("paymentForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Payment completed successfully!");
});

document.getElementById("uploadForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Product uploaded successfully!");
});
