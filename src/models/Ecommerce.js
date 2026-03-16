import mongoose from 'mongoose';

const EcommerceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  isRecommended: Boolean,
  image: { type: String }, // URL to image
  rating: {
    rate: Number,
    count: Number
  }
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', EcommerceSchema);