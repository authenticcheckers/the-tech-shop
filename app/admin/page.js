"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', description: '', adminSecret: '' });

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      // 1. Upload Image to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await axios.post('/api/upload', formData);
      const imageUrl = uploadRes.data.url;

      // 2. Save Product to MongoDB
      await axios.post('/api/products', { ...form, image: imageUrl });
      
      alert('Product Live!');
      setForm({ name: '', price: '', description: '', adminSecret: '' });
      setFile(null);
    } catch (err) {
      alert('Error uploading');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input 
          type="password"
          placeholder="Admin Secret" 
          className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-2 ring-blue-100 transition"
          onChange={e => setForm({...form, adminSecret: e.target.value})}
        />
        <div className="grid grid-cols-2 gap-4">
          <input 
            placeholder="Product Name" 
            className="p-3 bg-gray-50 rounded-lg"
            onChange={e => setForm({...form, name: e.target.value})}
          />
          <input 
            placeholder="Price (GH₵)" 
            type="number" 
            className="p-3 bg-gray-50 rounded-lg"
            onChange={e => setForm({...form, price: e.target.value})}
          />
        </div>
        
        {/* File Input */}
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>

        <textarea 
          placeholder="Description" 
          className="w-full p-3 bg-gray-50 rounded-lg h-32"
          onChange={e => setForm({...form, description: e.target.value})} 
        />
        
        <button disabled={uploading} type="submit" className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Publish Product'}
        </button>
      </form>
    </div>
  );
}
