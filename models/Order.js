import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number
  }],
  amount: { type: Number, required: true },
  status: { type: String, default: 'Paid' }, // Simplified for this flow
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
