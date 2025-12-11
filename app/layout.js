import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <CartProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto p-6 min-h-screen">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
