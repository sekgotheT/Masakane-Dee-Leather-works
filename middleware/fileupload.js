// middleware/fileUpload.js
const multer = require('multer');

// Set up storage location and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Store uploaded images in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);  // Prefix filename with timestamp
  },
});

// Initialize multer with the defined storage settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
}).single('image');  // Expect a single file with the name 'image'

module.exports = upload;
