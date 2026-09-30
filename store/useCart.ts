import { create } from "zustand";

interface Product{id:string; name:string; price:number}
interface CartStore{
    items: Product[]
    add:(p:Product)=> void;
    total:()=>number
    remove:(index:number)=>void
    clearCart:()=>void
}

export const useCart=create <CartStore>((set,get)=>({
    items:[],
    add:(p)=>set((state)=>({items: [...state.items,p]})),
    remove:(indexToRemove)=> set((state)=>({
        items:state.items.filter((_, index)=> index!== indexToRemove)
    })),
    total:()=>get().items.reduce((sum,item)=> sum +item.price,0),
    clearCart:()=>set({items:[]})
}))