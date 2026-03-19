import { NextResponse } from "next/server";
import dbConnect from "@/src/lib/mongodb"; 
import Product from "@/src/models/ProductList";

export async function GET(request) {
  try {
    await  dbConnect();
    const { searchParams } = new URL(request.url);
    
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("search");

    let query = {};

    if (category && category !== "All category") {
      // Replaces dashes from URL with spaces for DB matching
      const normalizedCat = category.replace(/-/g, ' ');
      query.category = { $regex: new RegExp(`^${normalizedCat}$`, 'i') };
    }

    // 2. Handle Search Input (Partial Match)
    if (searchTerm) {
      // Searches if the title CONTAINS the search term anywhere
      query.title = { $regex: new RegExp(searchTerm, 'i') };
    }

    const products = await Product.find(query);

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}