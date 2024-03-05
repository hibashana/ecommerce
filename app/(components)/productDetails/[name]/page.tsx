"use client";
import React, { useState, useEffect } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { MdOutlineRateReview } from "react-icons/md";
import { baseURL, imageURL } from '@/utils/constants';
import { Product,ProductImage } from '@/types';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Toaster, toast } from 'sonner';
import { BiSolidOffer } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { addtoWishlist } from "@/app/action/wishlist";


import axios from "axios";

interface ProductDetailsProps {
  product: Product[];
}

const Productdetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [productDetails, setProductDetails] = useState<Product>();

  const router=useRouter();

  useEffect(() => {
    getProductByName();
  }, []);

  const addtoCart = async (productId: number): Promise<void> => {

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      // const response = await axios.get(
      //   `${baseURL}/cart/addToCart?productId=${productId}`,
      //   { headers: { 
      //     'Authorization': `Bearer ${token}`,
      //     "Cache-Control": "no-store" } }
      // );
      const response = await fetch(`${baseURL}/cart/addToCart?productId=${productId}`,{ headers: { 
        'Authorization': `Bearer ${token}`,
        "Cache-Control": "no-store" } });
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Product Added to cart");
        console.log(response);
        router.push("/addtoCart")
      } else {
        
        toast.error("Failed to Add Product to cart");
        console.error("Failed to Add" );
      }
      
    } catch (error) {
      console.error('Error while adding the product to cart:', error);
    }
  };

  const getProductByName = async (): Promise<void> => {
    try {
      
      const name = window.location.pathname.split('/').pop(); //  name is the last part of the path
      const URL = `${baseURL}/product/by_name/${name}`;
      const response = await axios.get(URL, { headers: { "Cache-Control": "no-store" } });
      const data = response.data;
      console.log(data);
      setProductDetails(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleWishlist = async (productId: number) => {
    try {
        const status = await addtoWishlist(productId);
        if (status === 200) {
            toast.success("Product added to wishlist");
        } else if (status === 204) {
            toast.success("Product removed from wishlist");
        } else if (status === 401) {
            router.push('/login');
        } else {
            toast.error("Failed to update wishlist");
        }
    } catch (error) {
        console.error('Error:', error);
        toast.error("Failed to update wishlist");
    }
};


  return (
    <div className="flex flex-row px-3">
      {productDetails && (
        <div className='px-6 grid grid-cols-1 md:grid-cols-2 py-5'>
          <div className='flex items-center  justify-center ' >
          <Carousel className="w-4/5 border bg-stone-100 ">
            {productDetails.ProductImages && productDetails.ProductImages.map((image) => (
              <img
                key={image.id}
                src={image.imageUrl ? `${imageURL}${image.imageUrl}` : "https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"}
                alt={productDetails.name}
                className="mx-auto  text-center cursor-pointer lg:object-cover object-cover justify-center mb-2 rounded-md group-hover:scale-105 duration-300"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://img.freepik.com/premium-photo/colourful-smokes-mobile-screen-image-generative-ai_849906-7067.jpg';
                }}
              />
            ))}
         </Carousel>
          </div>
          <div className="">
            <h1 className='text-xl font-bold'>{productDetails.name}</h1>
            {/* <div>
              <div className="flex gap-2 items-center ">
                <Rating style={{ maxWidth: 80 }} value={4} readOnly />
                <span className='gap-10 text-orange-400'>4</span>
                <div className='flex  px-3 gap-1'>
                  <MdOutlineRateReview />
                  <p className="text-xs ">{12} reviews</p>
                </div>
              </div>
            </div> */}
            <p className='text-sm pb-4'>{productDetails.description}</p>

              <div className="border p-2 w-80 h-64">
                <div className="flex flex-row justify-center py-2 gap-3"> 
                   {productDetails.offerPercentage > 0 ? (
                      <p className="font-bold text-2xl ">${productDetails.offerPrice}</p>
                    ) : (
                      <p className="text-black text-2xl font-bold">${productDetails.price}</p>
                    )}
                    {productDetails.offerPercentage > 0 && (
                      <p className="p-1 text-slate-500 text-sm line-through">${productDetails.price}</p>
                    )}
                    <p className="flex flex-row logo rounded-3xl p-1 items-center">   
                        {productDetails.offerPercentage > 0 && (
                          <>
                          <BiSolidOffer className="mr-1" /> 
                           <span className="text-lg">
                             {productDetails.offerPercentage}%
                            </span>
                           </>
                         )}
                    </p>
                </div>
                <div className="flex items-center px-3 text-green-500">
              <TiTick className="mr-1" />
                 <p className="w-32">In Stock: {productDetails.stockQuantity}</p>
               </div>
               <div className="p-2">
                 <div className="border rounded-2xl cursor-pointer text-center p-2 bg-primary-color text-white"
                      onClick={() => addtoCart(productDetails.id)} >Add to cart</div>
               </div>
               <div className="px-2">  
                 <div className="border rounded-2xl cursor-pointer text-center p-2 border-blue-600 logo  font-bold " >Buy now</div>
               </div>
               <div className="flex justify-center items-center px-2 p-4 cursor-pointer logo" onClick={() => handleWishlist(productDetails.id)}>
                      <FaRegHeart className="mr-2 hover:text-red-600" /> 
                      <div className="text-center font-bold">Add to wishlist</div>
                </div>
            </div> 
          </div>
        </div>
      )}
      <Toaster richColors />
    </div>
  );
}

export default Productdetails;
