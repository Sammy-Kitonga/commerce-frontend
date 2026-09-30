"use client";

import { useState } from 'react';
import axios from 'axios';
import { useCart } from '@/store/useCart';
import { Phone, CheckCircle2, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Link from 'next/link';

export default function CheckoutPage() {
  const [phone, setPhone] = useState("2547XXXXXXXX");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { items, total, clearCart, remove } = useCart();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mpesa-backend-pj42.onrender.com/api";

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/checkout`, { phone, amount: total() });
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Check your network or details.");
    }
    setLoading(false);
  };

  if (items.length === 0 && !success) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-500" />
        </div>
        <h2 className="text-3xl font-semibold text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Explore our catalog to find premium tech gear.</p>
        <Link href="/">
          <button className="bg-[#d4ff00] text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 text-white font-sans">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-[#d4ff00] mb-8 transition-colors text-sm">
        <ArrowLeft size={16} className="mr-2" /> Back to Catalog
      </Link>

      <h1 className="text-4xl font-semibold tracking-tight mb-10">Checkout</h1>
      
      {success ? (
        <div className="max-w-xl mx-auto bg-[#1a1a1a] border border-[#d4ff00]/30 rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#d4ff00]"></div>
          <CheckCircle2 className="mx-auto text-[#d4ff00] mb-6" size={64} />
          <h2 className="text-3xl font-bold text-white mb-4">Payment Initiated!</h2>
          <p className="text-gray-400 mb-8 text-lg">
            An M-Pesa STK push has been sent to <span className="text-white font-semibold">{phone}</span>. Please enter your PIN on your device to complete the purchase.
          </p>
          <Link href="/">
            <button className="border border-gray-700 hover:border-gray-500 text-white font-semibold py-3 px-8 rounded-full transition-colors w-full">
              Return to Store
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-3 space-y-6">
            <h2 className="text-xl font-medium mb-4 text-gray-300">Order Summary</h2>
            <div className="bg-[#1a1a1a] rounded-3xl p-6 border border-gray-800">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-800 last:border-0 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0d0d0d] rounded-lg flex items-center justify-center overflow-hidden">
                       {item.imageURL ? <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover" /> : <ShoppingBag size={16} className="text-gray-600"/>}
                    </div>
                    <span className="font-medium text-gray-200">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-lg">KES {item.price}</span>
                    <button 
                      onClick={() => remove(idx)} 
                      className="text-gray-600 hover:text-red-500 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center font-bold text-2xl pt-6 mt-2 border-t border-gray-800">
                <span className="text-gray-400">Total</span>
                <span className="text-[#d4ff00]">KES {total()}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-medium mb-4 text-gray-300">Payment Details</h2>
            <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4ff00] opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1">Pay with M-Pesa</h3>
                <p className="text-sm text-gray-500">Instant, secure mobile payment</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-gray-500" size={18} />
                    <input 
                      className="w-full bg-[#0d0d0d] border border-gray-700 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#d4ff00] transition-colors"
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 ml-2">Format: 2547XXXXXXXX</p>
                </div>
                
                <button 
                  onClick={handleCheckout} 
                  disabled={loading} 
                  className="w-full bg-[#d4ff00] hover:bg-[#bde600] text-black font-bold text-lg py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(212,255,0,0.15)] hover:shadow-[0_0_25px_rgba(212,255,0,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    `Pay KES ${total()}`
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center gap-6 opacity-40 grayscale">
               <span className="text-xs font-bold tracking-widest uppercase">Secured by Daraja</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}