import mongoose from "mongoose";

const ProductListSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  description: String,
  img: String, // Stored as a string path like "/images/..."
  category: { type: String, index: true },
}, { timestamps: true });

// Export the model, forcing the collection name to 'product_list'
export default mongoose.models.ProductList || 
  mongoose.model("ProductList", ProductListSchema, "product_list");