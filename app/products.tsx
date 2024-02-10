import React,{ useState, useEffect } from 'react';
import { GoHeartFill,GoHeart } from "react-icons/go";
import { baseURL,imageURL } from '@/utils/constants';
import { MdShare,MdCompareArrows} from "react-icons/md";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { Product} from "@/types";


const Products = () => {

    const addtoCart = async (productId: number): Promise<void> => {
        const router=useRouter();
        const token = localStorage.getItem('token');
        console.log(token);
        
        if (!token) {
          router.push('/login');
          return;
        }
        try {
         
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

    const [product, setProductData] = useState<Product[]>([]);
  return (
    <div>
        <div className='flex flex-wrap justify-center'>
     {product.map((product, index) => (
        <div key={index} className='px-2 relative '>
            <div className=''>
            <div className="flex flex-col w-64  h-fit group pt-4 cursor-pointer relative">
                <div className="bg-sky-50 w-full h-72 relative  ">
                    {product.offerPercentage > 0 && (
                        <p className="absolute rounded-full w-9 h-9 flex justify-center items-center text-white text-xs right-2 top-2" style={{ backgroundColor: '#f87171' }}>
                            -{product.offerPercentage}%
                        </p>
                    )}
                    <img
                        src={product.imageUrl ? `${imageURL}${product.imageUrl}` : "https://i.blogs.es/7342c1/iphone-13-1-/840_560.jpg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://img.freepik.com/premium-photo/colourful-smokes-mobile-screen-image-generative-ai_849906-7067.jpg';
                        }}
                    />
                    <div className="absolute h-full w-full bg-black/60 flex flex-col items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-95 transition-all duration-300">
                        <button className="bg-white text-yellow-600 font-semibold py-2 px-6" onClick={() => addtoCart(product.id)}>Add to cart</button>
                        <div className='flex flex-row text-center text-white gap-3 py-2 px-2'>
                            <div className="flex  items-center">
                                <MdShare />
                                <div className="p-1">Share</div>
                            </div>
                            <div className="flex items-center">
                                <MdCompareArrows />
                                <div className="p-1">Compare</div>
                            </div>
                            <div className="flex items-center">
                                <GoHeart className='text-lg font-semibold' />
                                <div className="p-1">Like</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-3 gap-1 py-1 relative z-10" style={{ backgroundColor: '#F4F5F7' }}>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600 text-xs">{product.description}</p>
                    <div className="flex flex-row gap-3">
                        {product.offerPercentage > 0 ? (
                            <p className="font-bold">${product.offerPrice}</p>
                        ) : (
                            <p className="text-black font-bold">${product.price}</p>
                        )}
                        {product.offerPercentage > 0 && (
                            <p className="text-slate-500 line-through">${product.price}</p>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    ))}
</div>
    </div>
  )
}

export default Products