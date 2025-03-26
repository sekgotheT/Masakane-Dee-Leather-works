// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.admin = decoded;  // Store the decoded JWT (admin details) in the request object
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = { authenticateAdmin };
