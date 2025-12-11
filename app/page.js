// app/page.js (Updated)
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar'; // Import Navbar

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New State for Search
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    // Fetch products once on mount
    axios.get('/api/products')
      .then((res) => {
        setProducts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pass the search handler down to the Navbar
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  
  if (loading) return <div className="text-center py-20 text-gray-500">Loading the shop...</div>;

  return (
    <>
      {/* NOTE: Since the Navbar is in layout.js in the previous version, 
        you should move it HERE (or restructure the layout) to pass props.
        If you want to keep it in layout.js, you'd need a separate SearchContext, 
        but moving it here is simpler.
      */}
      <Navbar onSearchChange={handleSearchChange} /> 
      
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-light mb-8 text-gray-700">
            {searchTerm ? `Results for "${searchTerm}"` : 'Latest Arrivals'}
        </h1>
        
        {filteredProducts.length === 0 && searchTerm ? (
            <div className="text-center mt-10 text-gray-500">
                Sorry, no products matched your search.
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
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
