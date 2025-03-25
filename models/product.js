const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,  // Ensure product name is unique
    trim: true,    // Automatically trims whitespace
    minlength: [3, 'Product name must be at least 3 characters long'],
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: { 
    type: String, 
    required: true, 
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  price: { 
    type: Number, 
    required: true, 
    min: [0, 'Price must be a positive number']  // Ensure price is not negative
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: [0, 'Stock must be a positive number']  // Ensure stock is not negative
  }
}, { timestamps: true });  // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Product', productSchema);
