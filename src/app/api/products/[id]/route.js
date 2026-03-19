import { NextResponse } from "next/server";
import mongoose from "mongoose";
import ProductList from "@/src/models/ProductList";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export async function GET(req, { params }) {
  try {
    await connectDB();
    
    // params.id comes from the folder name [id]
    const { id } = params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid Product ID format" }, { status: 400 });
    }

    const product = await ProductList.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("GET Product Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}