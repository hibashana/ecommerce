"use client"
import React, { useState, useEffect } from 'react';
import Products from '@/app/products';
import {Product} from "@/types";
import { addtoWishlist,getWishlist } from '../action/wishlist';
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';




const wishlist = () => {

  const [product, setProductData] = useState<Product[]>([])
  const router=useRouter();

  

  useEffect(() => {
    getWishlistitem();
  }, []);

  const getWishlistitem = async (): Promise<void> => {
    try {
        const { data, status } = await getWishlist();
        
        if (status === 200) {
            setProductData(data.data);
            
        } else if (status === 401) {
            router.push('/login');
        } else {
            console.error('Error in Wishlist. Status:', status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

    
  
  return (
    <div>
      <Products product={product}/>
      <Toaster richColors />
    </div>
  ) 
}

export default wishlist