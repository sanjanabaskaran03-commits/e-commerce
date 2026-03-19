import { NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Ecommerce';

// ecommerce-route.js
export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const tagParam = searchParams.get('tag');
    
    let query = {};

    if (tagParam) {
      const tags = tagParam.split(',').map(t => t.trim());
      // $in looks for ANY of the tags provided within the document's sectionTags array
      query.sectionTags = { $in: tags }; 
    }

    const products = await Product.find(query).lean(); // .lean() makes it faster for GET
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const payload = Array.isArray(body) ? body : [body];
    const created = await Product.insertMany(payload);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create products" }, { status: 500 });
  }
}
