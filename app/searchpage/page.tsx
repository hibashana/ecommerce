"use client"
import React, { useState, useEffect } from 'react';
import Filter from '../filter';
import Products from '../products';
import { Product } from "@/types";
import Search from '../action/search';
import { useSearchParams } from 'next/navigation';

const Searchpage = () => {

  const [product, setProductData] = useState<Product[]>([]);
  const searchParams = useSearchParams()
  const name = searchParams.get('name') 
  
  const productList = async (name: string) => {
    try {
        const { data, status } = await Search(name);
        if (status === 200) {
            setProductData(data.data); 
        } else {
            console.error('Error fetching Product. Status:', status);
        }
    } catch (error) {
        console.error('Error fetching product :', error);
    }
};

useEffect(() => {
  if (name) {
    productList(name);
  }
}, [name]);

  return (
    <div>
      <Filter/>
      <Products product={product}/>
    </div>
  )
}

export default Searchpage;
