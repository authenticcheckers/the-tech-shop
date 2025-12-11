import dbConnect from '../../lib/db';
import Order from '../../models/Order';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  const order = await Order.create(body);
  return NextResponse.json(order, { status: 201 });
}
