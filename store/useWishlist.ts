import { create } from "zustand";
import {Product} from "./useCart"

interface WishlistStore{
    items:Product[]
    toggle: (itemm:Product)=>void
    isInWishlist:(id:string)=>boolean
}

export const useWishlist=create<WishlistStore>((set,get)=>({
    items:[],
    toggle:(item)=> set((state)=>{
        const exists=state.items.find(i=>i.id=== item.id)
    if(exists){
        return{items:state.items.filter(i=>i.id !==item.id)}
    }
    return {items:[...state.items,item]}
    }),

    isInWishlist:(id)=>!!get().items.find(i=>i.id ===id)
}))