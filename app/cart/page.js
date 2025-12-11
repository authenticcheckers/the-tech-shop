"use client";
import { useCart } from '@/context/CartContext';
import { PaystackButton } from 'react-paystack';

export default function Cart() {
  const { cart, removeFromCart, total } = useCart();

  const componentProps = {
    email: 'user@example.com', // In a real app, get this from an input or User Auth
    amount: total * 100, // Paystack takes amount in kobo/pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    text: "Pay Now",
    onSuccess: () => alert("Payment Successful! Order placed."),
    onClose: () => alert("Payment cancelled."),
  };

  if (cart.length === 0) return <div className="text-center mt-20 text-gray-500">Your cart is empty.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>
      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b border-gray-50 pb-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-400">GH₵ {item.price}</p>
            </div>
            <button onClick={() => removeFromCart(item._id)} className="text-red-400 text-sm hover:text-red-600">Remove</button>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center border-t border-gray-100 pt-6">
        <div className="text-xl font-bold">Total: GH₵ {total.toLocaleString()}</div>
        <div className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
          <PaystackButton {...componentProps} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
