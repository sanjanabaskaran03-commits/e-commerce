import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  }
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
    unique: true 
  },
  items: [CartItemSchema], 
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);