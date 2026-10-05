"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useCart } from '@/store/useCart';
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from 'next/link';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mpesa-backend-pj42.onrender.com/api";

  useEffect(() => {
    axios.get(`${API_URL}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl font-bold">Loading your product...</div>;
  if (!product) return <div className="text-center py-20 text-xl font-bold text-red-500">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link href="/" className="inline-flex items-center text-blue-600 hover:underline mb-8">
        <ArrowLeft size={16} className="mr-2" /> Back to Store
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl overflow-hidden shadow-md aspect-square flex items-center justify-center bg-slate-100">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
          ) : (
            <div className="text-slate-400">No image available</div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">KES {product.price}</p>
          
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            {product.description || "This is a premium product. Add a description in your database to see it here!"}
          </p>

          <Button onClick={() => add(product)} className="w-full md:w-auto text-lg py-6 px-8 flex items-center gap-2">
            <ShoppingCart /> Add to Cart
          </Button>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review: any) => (
                  <div key={review.id} className="p-4 bg-white rounded-lg shadow-sm border">
                    <div className="flex text-yellow-500 mb-2">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No reviews yet. Be the first to try this item!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}