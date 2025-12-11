import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  
  // Simple Admin Security Check
  const { adminSecret, ...productData } = body;
  if (adminSecret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const product = await Product.create(productData);
  return NextResponse.json(product, { status: 201 });
}
