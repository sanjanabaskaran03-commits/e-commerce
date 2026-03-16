import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  // This "ref" links the item directly to your Product model
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
  // In a real app, this links to the logged-in User
  userId: {
    type: String, // Or mongoose.Schema.Types.ObjectId if you have a User model
    required: true,
    unique: true // One cart per user
  },
  items: [CartItemSchema], // Array of products
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);