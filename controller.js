@RestController
@RequestMapping("/api")
public class LeatherWorksController {

    @PostMapping("/order")
    public String placeOrder(@RequestBody Order order) {
        return "Order placed successfully!";
    }

    @PostMapping("/payment")
    public String processPayment(@RequestBody Payment payment) {
        return "Payment processed successfully!";
    }

    @PostMapping("/upload")
    public String uploadProduct(@RequestParam("file") MultipartFile file) {
        return "Product uploaded successfully!";
    }
}
