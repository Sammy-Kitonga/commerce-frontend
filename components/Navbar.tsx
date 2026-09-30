"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useCart } from "@/store/useCart";

export default function Navbar() {
  const { items } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0d0d0d] border-b border-gray-800 text-white pb-4 pt-6">
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-2xl tracking-wide">
            Electronics
          </Link>
          <button className="flex items-center gap-2 border border-gray-700 rounded-full px-5 py-2 text-sm hover:bg-gray-800 transition">
            <Menu size={16} /> Catalog
          </button>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-[#d4ff00] border-b-2 border-[#d4ff00] pb-1">Bestsellers</Link>
          <Link href="/sale" className="text-gray-400 hover:text-white transition pb-1">Sale</Link>
          <Link href="/new" className="text-gray-400 hover:text-white transition pb-1">New Arrivals</Link>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition"><Search size={20} /></button>
          
          <Link href="/checkout" className="relative flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ShoppingCart size={20} />
            <span className="text-sm">Cart</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -left-2 bg-[#d4ff00] text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <User size={20} />
            <span className="text-sm">Log in</span>
          </button>
        </div>
      </div>
    </nav>
  );
}