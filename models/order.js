const mongoose = require('mongoose');

// Enum for payment status
const paymentStatuses = ['Pending', 'Paid', 'Failed', 'Refunded'];

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  paymentStatus: { type: String, default: 'Pending', enum: paymentStatuses }
}, { timestamps: true });  // Include timestamps for order creation and update

module.exports = mongoose.model('Order', orderSchema);
