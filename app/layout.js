// app/layout.js
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from '@/context/CartContext';
import './globals.css';

// 1. Metadata for SEO (Updated Name)
export const metadata = {
  title: 'The Tech Shop - Next-Gen Electronics Retail',
  description: 'Your advanced, professional platform for the latest tech products.',
};

export default function RootLayout({ children }) {
  return (
    // 2. Clerk Provider wraps the entire application for authentication
    <ClerkProvider> 
      <html lang="en">
        <body className="bg-gray-50 text-gray-800">
          {/* 3. Cart Provider manages the global cart state */}
          <CartProvider>
            {/* The Navbar has been removed from here and moved to app/page.js */}
            <main className="max-w-7xl mx-auto p-6 min-h-screen">
              {children}
            </main>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
