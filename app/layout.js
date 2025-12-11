// app/layout.js (Updated)
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    // Wrap the entire app in ClerkProvider
    <ClerkProvider> 
      <html lang="en">
        <body className="bg-gray-50 text-gray-800">
          <CartProvider>
            {/* Navbar is rendered within CartProvider, usually here or in page.js */}
            <main className="max-w-7xl mx-auto p-6 min-h-screen">{children}</main>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
