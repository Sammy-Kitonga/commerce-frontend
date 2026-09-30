"use client";

import { useEffect } from 'react';
import { useProducts } from '@/store/useProduct';
import { useCart } from '@/store/useCart';
import { Heart, Star, ChevronDown, X } from "lucide-react";
import Link from 'next/link';
import { Menu,Search } from 'lucide-react';

export default function Home() {
  const { products, loading, fetchProducts } = useProducts();
  const { add } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-12 font-sans text-white">
      
      <aside className="w-64 flex-shrink-0 hidden lg:block">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 cursor-pointer hover:text-white">
            <X size={16} /> Reset filters
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {['Apple', 'SMEG', 'Remez', 'Home Appliances', 'Kitchen Appliances'].map(tag => (
              <span key={tag} className="bg-[#1a1a1a] border border-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-2">
                {tag} <X size={12} className="cursor-pointer hover:text-white" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 border-t border-gray-800 pt-6">
          <div className="flex justify-between items-center cursor-pointer">
            <h3 className="text-lg">Price</h3>
            <ChevronDown size={18} className="text-gray-500" />
          </div>
          
          <div>
            <div className="flex justify-between items-center cursor-pointer mb-4">
              <h3 className="text-lg">Brand</h3>
              <ChevronDown size={18} className="text-gray-500 transform rotate-180" />
            </div>
            
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-2.5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search brands" 
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-gray-600"
              />
            </div>

            <div className="space-y-3">
              {['Apple', 'LG', 'KitchenAid', 'SMEG', 'Samsung', 'Sony', 'Remez'].map((brand, i) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${[0, 3, 6].includes(i) ? 'bg-[#d4ff00] border-[#d4ff00]' : 'border-gray-600 group-hover:border-gray-400'}`}>
                    {[0, 3, 6].includes(i) && <X size={14} className="text-black" />} 
                  </div>
                  <span className="text-gray-300 text-sm">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold tracking-tight mb-2">Bestsellers</h1>
          <div className="text-sm text-gray-500 mb-8">Home • <span className="text-gray-300">Bestsellers</span></div>
          
          <div className="flex justify-between items-end border-b border-gray-800 pb-4">
            <div className="flex gap-8 text-sm">
              <button className="text-[#d4ff00] border-b-2 border-[#d4ff00] pb-4 -mb-[17px]">All items</button>
              <button className="text-gray-400 hover:text-white pb-4">Smartphones</button>
              <button className="text-gray-400 hover:text-white pb-4">Kitchen</button>
              <button className="text-gray-400 hover:text-white pb-4">Game Console</button>
            </div>
            <button className="flex items-center gap-2 border border-gray-800 rounded-full px-4 py-2 text-sm text-gray-300 hover:bg-[#1a1a1a]">
              <Menu size={16} /> Top rated
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 bg-[#1a1a1a] rounded-3xl animate-pulse" />
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="bg-[#1a1a1a] rounded-3xl p-5 relative group flex flex-col cursor-pointer hover:bg-[#222] transition">
                <div className="flex justify-between items-start mb-4 z-10">
                  <span className="bg-[#d4ff00] text-black text-xs font-bold px-2 py-1 rounded">Sale 15%</span>
                  <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition">
                    <Heart size={18} />
                  </button>
                </div>
                
                <div className="h-48 w-full flex items-center justify-center mb-6 relative">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain drop-shadow-2xl" />
                  ) : (
                    <div className="text-gray-600">No image</div>
                  )}
                </div>

                <div className="mt-auto">
                  <div className="flex justify-between items-center text-xs text-gray-400 mb-2 uppercase tracking-wider">
                    <span>BRAND</span>
                    <span className="flex items-center gap-1 text-white"><Star size={12} className="text-[#d4ff00] fill-[#d4ff00]" /> 5.0</span>
                  </div>
                  
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl font-bold">KES {product.price}</span>
                    <span className="text-sm text-gray-500 line-through">KES {(product.price * 1.15).toFixed(2)}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{product.name}</p>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center backdrop-blur-sm">
                  <button 
                    onClick={(e) => { e.stopPropagation(); add(product); }}
                    className="bg-[#d4ff00] text-black font-bold py-3 px-8 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}