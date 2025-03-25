package com.leatherworks.controller;

import com.leatherworks.model.Order;
import com.leatherworks.model.Payment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class LeatherWorksController {

    @PostMapping("/order")
    public ResponseEntity<String> placeOrder(@RequestBody Order order) {
        if (order == null || order.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Invalid order details.");
        }
        return ResponseEntity.ok("✅ Order placed successfully!");
    }

    @PostMapping("/payment")
    public ResponseEntity<String> processPayment(@RequestBody Payment payment) {
        if (payment == null || payment.getAmount() <= 0) {
            return ResponseEntity.badRequest().body("❌ Invalid payment details.");
        }
        return ResponseEntity.ok("✅ Payment processed successfully!");
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadProduct(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ No file uploaded.");
        }
        try {
            // Simulating file processing
            byte[] bytes = file.getBytes();
            return ResponseEntity.ok("✅ Product uploaded successfully! File size: " + bytes.length + " bytes.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("❌ File upload failed due to an error.");
        }
    }
}

