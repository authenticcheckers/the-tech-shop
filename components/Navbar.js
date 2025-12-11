"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">TechStore.</Link>
        <div className="flex gap-6 items-center">
          <Link href="/admin" className="text-sm text-gray-500 hover:text-blue-600">Admin</Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition">
            <ShoppingBag />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
