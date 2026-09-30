"use client";

import { useEffect } from 'react';
import { useProducts } from '@/store/useProduct';
import { useCart } from '@/store/useCart';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function Home() {
  const { products, loading, fetchProducts } = useProducts();
  const { add } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <section className="mb-16 text-center py-12 bg-blue-600 rounded-3xl text-white shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Syokinet Electronics</h1>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Upgrade your workspace with our premium selection of hardware. Fast delivery, instant M-Pesa checkout.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((n) => (
            <Card key={n} className="h-full flex flex-col bg-white overflow-hidden border-slate-200 shadow-sm">
              <div className="h-48 bg-slate-200 animate-pulse" />
              <CardHeader>
                <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse" />
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-8 bg-slate-200 rounded w-1/2 animate-pulse mt-2" />
              </CardContent>
              <CardFooter className="flex gap-2">
                <div className="h-10 bg-slate-200 rounded flex-1 animate-pulse" />
                <div className="h-10 bg-slate-200 rounded flex-1 animate-pulse" />
              </CardFooter>
            </Card>
          ))
        ) : (
          
          products.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-shadow bg-white overflow-hidden border-slate-200">
                <div className="h-48 bg-slate-50 relative group">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="truncate text-xl">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-2xl font-extrabold text-blue-600">KES {product.price}</p>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Link href={`/product/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      View Details
                    </Button>
                  </Link>
                  <Button 
                    onClick={() => add(product)} 
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}