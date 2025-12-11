"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('/api/products').then((res) => setProducts(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-light mb-8 text-gray-700">Latest <span className="font-semibold text-black">Arrivals</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
            <div className="h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
               {/* Use a real image tag here */}
               <img src={product.image} alt={product.name} className="object-contain h-full w-full" />
            </div>
            <h2 className="font-medium text-lg">{product.name}</h2>
            <p className="text-gray-500 text-sm mb-3 truncate">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold text-blue-600">GH₵ {product.price.toLocaleString()}</span>
              <button 
                onClick={() => addToCart(product)}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
