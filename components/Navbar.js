// components/Navbar.js (Updated with Clerk components)
"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Search } from 'lucide-react';
// Import Clerk Components
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar({ onSearchChange }) {
  const { cart } = useCart();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* BRAND NAME */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          The Tech Shop
        </Link>
        
        {/* Search Bar (remains the same) */}
        <div className="flex-1 max-w-md mx-8">
            {/* ... Search input logic ... */}
            {/* We assume onSearchChange is handled by the parent (app/page.js) */}
        </div>

        <div className="flex gap-6 items-center">
          {/* Cart Link (remains the same) */}
          <Link href="/cart" className="relative group">{/* ... Cart code ... */}</Link>

          {/* CLERK LOGIN/LOGOUT LOGIC */}
          <SignedIn>
            {/* Show User Profile image when logged in */}
            <UserButton afterSignOutUrl="/" /> 
          </SignedIn>
          <SignedOut>
            {/* Show a professional sign-in button when logged out */}
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition">
                Login
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
