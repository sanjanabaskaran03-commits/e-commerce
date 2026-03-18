import { NextResponse } from 'next/server';
import dbConnect from '@/src/lib/mongodb';
import Product from '@/src/models/Ecommerce';

export async function GET(req) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const tagParam = searchParams.get('tag');
    const query = {};

    if (tagParam) {
      const tags = tagParam.split(',').map((t) => t.trim()).filter(Boolean);
      if (tags.length > 0) {
        query.sectionTags = { $in: tags };
      }
    }

    const products = await Product.find(query);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
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
