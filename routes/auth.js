const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Secure password handling
const router = express.Router();

// Simulated Admin Credentials (Replace with Database in Future)
const adminUsername = process.env.sekgothethsepang30@gmail.com;
const hashedAdminPassword = process.env.ADMIN_PASSWORD_HASH=$2a$10$0GKwU9jC5Aov3FQmB5j4aO6IhOVt1mXq8JsNWW2XaEX.yzD5Sx6IW
; // Store a hashed password in .env

// Admin Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!adminUsername || !hashedAdminPassword) {
    return res.status(500).json({ error: 'Server misconfiguration. Admin credentials are missing.' });
  }

  // Check Username
  if (username !== adminUsername) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Verify Password
  const isPasswordValid = await bcrypt.compare(password, hashedAdminPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate JWT Token
  const token = jwt.sign(
    { username, role: 'admin' },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '2h' } // Extended session duration
  );

  res.status(200).json({ token, message: 'Login successful' });
});

module.exports = router;
