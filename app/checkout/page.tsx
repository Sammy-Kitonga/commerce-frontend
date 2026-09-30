"use client"

import { useState } from "react"
import axios from "axios"
import { useCart } from "@/store/useCart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card,CardContent } from "@/components/ui/card"
import { Phone,CheckCircle2,Trash2 } from "lucide-react"
import Link from "next/link"
// import { div } from "framer-motion/client"

export default function CheckoutPage () {
    const [phone,setPhone]=useState("2547XXXXXXXXX")
    const [loading,setLoading]=useState(false)
    const [success,setSuccess]=useState(false)
    const {items,total,clearCart,remove}=useCart()
    const API_URL="https://mpesa-backend-pj42.onrender.com/api"

    const handleCheckout=async()=>{
        setLoading(true)
        try{
            await axios.post(`${API_URL}/checkout`,{phone,amount:total()})
            setSuccess(true)
            clearCart()
        } catch(err){
            console.error(err)
            alert("Checkout failed.Check your network or details")
        }
        setLoading(false)
    }

    if(items.length ===0 && !success){
        return(
            <div className="max-w-2xl mx-auto mt-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link href="\"> <Button>Go shopping</Button> </Link>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            {success ?(
                <Card className="border-green-200 bg-green-50">
                    <CardContent className="pt-6 text-center">
                        <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48}/>
                        <h2 className="text-2xl font-bold text-green-900 mb-2">Check your phone!</h2>
                        <p>Mpesa prompt sent to {phone}.Enter PIN to complete the purchase</p>
                        <Link href="/"><Button>Return to store</Button></Link>
                    </CardContent>
                </Card>
            ):(
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h2 className="font-semibold text-lg border-b pb-2">Order summary</h2>
                        {items.map((items,idx)=>(
                        <div key={idx} className="flex justify-between items-center text-sm bg-slate-50 p-3 rounded-md">
                            <span className="font-medium text-slate-800">{items.name}</span>
                            <div className="flex items-center gap-4">
                                <span className="font-bold">KES {items.price}</span>
                                <Button
                                title="Remove item"
                                onClick={()=>remove(idx)}
                                className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-colors"
                                >
                                    <Trash2 size={20}/>
                                </Button>
                            </div>
                        </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg pt-4 border-t">
                            <span>Total</span>
                            <span>{total()}</span>
                        </div>
                    </div>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <h2 className="font-semibold text-lg mb-4 text-green-600">Pay with M-pesa</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700"></label>
                                    <div className="relative mt-1">
                                        <Phone className="absolute left-3 top-3 text-slate-400" size={18}/>
                                        <Input
                                        className="pl-10 border-slate-300"
                                        value={phone}
                                        onChange={(e)=> setPhone(e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2" >Format:2547XXXXXXXXX</p>
                                </div>

                                <Button
                                    onClick={handleCheckout}
                                    disabled={loading}
                                    className={"w-full bg-green-600 hover:bg-green-700 text-white"}
                                
                                >{loading?"Sending prompt...":`Pay KES ${total()}`}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>    
                <div/>
            </div>

            )}
        </div>
    )
}