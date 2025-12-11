"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, User } from 'lucide-react';
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { cart } = useCart();
  const { data: session } = useSession();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          TechStore.
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link href="/cart" className="relative group">
            <ShoppingBag className="text-gray-600 group-hover:text-blue-600 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-3">
              <Link href="/profile">
                 <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200" />
              </Link>
              <button onClick={() => signOut()} className="text-xs font-medium text-gray-500 hover:text-red-500">Sign Out</button>
            </div>
          ) : (
            <button 
              onClick={() => signIn("google")} 
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition"
            >
              <User size={14} /> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
