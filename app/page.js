// app/page.js
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar'; 
import ProductCard from '@/components/ProductCard'; // Assuming you separate the card component

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // --- Data Fetching ---
  useEffect(() => {
    setLoading(true);
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // --- Search Logic ---
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  
  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-blue-600 animate-pulse">Loading The Tech Shop...</p>
    </div>
  );

  return (
    <>
      {/* 1. Navbar is placed here to pass the search handler */}
      <Navbar onSearchChange={handleSearchChange} />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-3xl font-light mb-8 text-gray-700">
            {searchTerm ? `Results for "${searchTerm}" (${filteredProducts.length})` : 'Latest Arrivals'}
        </h1>
        
        {/* Product Grid / No Results */}
        {filteredProducts.length === 0 && searchTerm ? (
            <div className="text-center mt-10 p-10 bg-white rounded-xl shadow-md">
                <p className="text-lg text-gray-500">Sorry, no products matched your search. Try a different term.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Simplified the Product Card rendering by assuming a separate component for cleanliness */}
                {filteredProducts.map((product) => (
                    // This is the component structure you had before:
                    <div key={product._id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
                        <div className="h-48 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
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
        )}
      </div>
    </>
  );
}
