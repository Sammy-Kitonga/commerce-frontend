"use client"

import Link from "next/link"
import { ShoppingCart,Package } from "lucide-react"
import { useCart } from "@/store/useCart"
import { Button } from "@/components/ui/button"

export default function Navbar(){
    const {items,total}=useCart()
    return(
        <nav className="sticky-top-0 z-50 w-full border-b bg/white/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Package className="text-blue-600"/>
            Electronics
            </Link>

            <div className="flex items-center gap-4">
                <Link href="/checkout">
                    <div className="relative">
                        <Button variant={"outline"} className={"flex items-center gap-2"}>
                            <ShoppingCart size={18}/>
                            <span>Cart</span>
                        </Button>
                        
                        {items.length >0 &&(
                                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 rounded-full flex items-center justify-center leading-none">{items.length}</span>
                            )}
                    </div>     
                </Link>
            </div>
            
            
            </div>

        </nav>
    )
}