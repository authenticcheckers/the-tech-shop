"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Admin() {
  const [form, setForm] = useState({ name: '', price: '', image: '', description: '', adminSecret: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', form);
      alert('Product Added!');
      setForm({ name: '', price: '', image: '', description: '', adminSecret: '' });
    } catch (err) {
      alert('Failed: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Upload</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          placeholder="Admin Secret Key" 
          className="w-full p-3 border rounded-lg bg-gray-50"
          value={form.adminSecret} 
          onChange={e => setForm({...form, adminSecret: e.target.value})} 
          type="password"
          required
        />
        <input 
          placeholder="Product Name" 
          className="w-full p-3 border rounded-lg bg-gray-50"
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required
        />
        <input 
          placeholder="Price" 
          type="number" 
          className="w-full p-3 border rounded-lg bg-gray-50"
          value={form.price} 
          onChange={e => setForm({...form, price: e.target.value})} 
          required
        />
        <input 
          placeholder="Image URL" 
          className="w-full p-3 border rounded-lg bg-gray-50"
          value={form.image} 
          onChange={e => setForm({...form, image: e.target.value})} 
          required
        />
        <textarea 
          placeholder="Description" 
          className="w-full p-3 border rounded-lg bg-gray-50"
          value={form.description} 
          onChange={e => setForm({...form, description: e.target.value})} 
        />
        <button type="submit" className="w-full bg-black text-white p-3 rounded-lg font-medium">
          Upload Product
        </button>
      </form>
    </div>
  );
}
