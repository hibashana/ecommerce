"use client"
import React, { useState, useEffect } from "react";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { Product } from '@/types';
import { baseURL,imageURL } from "@/utils/constants";
import { Rating } from '@smastrom/react-rating'
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';

import '@smastrom/react-rating/style.css'

interface ProductProps {
  product: Product[];
}

const ProductPage : React.FC<ProductProps> = ({ product }) => {
  const [cartStates, setCartStates] = useState<{ [productId: number]: boolean }>({});
  const [prodct, setProducts] = useState<Product[]>([]);
  const [rating, setRating] = useState(0)

  const router=useRouter();
  // const products = [
  //   {
  //     id:1,
  //     name: 'Iphone 13',
  //     actualPrice: 45.00,
  //     offerPrice: 32.98,
  //     stock: 10,
  //     rating: 4.5,
  //     reviews: 8,
  //     imageUrl: '/iPhone-13-Tt.png',
  //   },
  //   {
  //     id:2,
  //     name: 'Sades',
  //     actualPrice: 14.90,
  //     offerPrice: 12.98,
  //     stock: 15,
  //     rating: 4.2,
  //     reviews: 256,
  //     imageUrl: '/sades.png', 
  //   },
    
  //   {
  //     id:4,
  //     name: 'Led Tv',
  //     actualPrice: 14.90,
  //     offerPrice: 12.98,
  //     stock: 15,
  //     rating: 4.2,
  //     reviews: 256,
  //     imageUrl: '/ledTv.png', 
  //   },
  //   {
  //     id:5,
  //     name: 'Sades',
  //     actualPrice: 14.90,
  //     offerPrice: 12.98,
  //     stock: 15,
  //     rating: 4.2,
  //     reviews: 256,
  //     imageUrl: '/sades.png', 
  //   },{
  //     id:3,
  //     name: 'Asus',
  //     actualPrice: 68.90,
  //     offerPrice: 65.98,
  //     stock: 24,
  //     rating: 2.5,
  //     reviews: 56,
  //     imageUrl: '/asus-laptop.png',
  //   },
  // ];

//   const addToCart = (product) => {
//     // Add your logic to handle adding the product to the cart
//     console.log('Product added to cart:', product);
//   };


{/* <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              /> */}
              // return (
            //     <div className="flex flex-wrap justify-center p-20">
            //       <div>
            //       <div className="max-w-sm h-60 w-48 relative">
            //         {/* Background color container at the bottom */}
            //         <div className="absolute bottom-0 left-0 w-full h-52 bg-zinc-100 rounded-t-3xl"></div>
            
            //         {/* Image container */}
            //         <div className="absolute top-0 left-0 w-48 h-56">
            //           <img className="w-40 h-full object-cover" src="/sades.png" alt="iPhone 12" />
            //         </div>
            //       </div>
            
            //       {/* Text container */}
            //       <div className="max-w-sm h-60 w-48 relative">
            //         <div className="bg-white overflow-hidden p-2 shadow-lg absolute rounded-b-3xl  left-0 w-full flex items-center justify-center">
            //           <div className="text-center">
            //             <div className="font-bold text-xl mb-2">
            //               <h1>iPhone 12</h1>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //     </div>
            
            
            
            //   );
            // };

  useEffect(() => {
     getProducts();
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
          setCartStates((prevStates) => ({
            ...prevStates,
            [productId]: true  
          }));
         
        } else {
          
          toast.error("Failed to Add Product to cart");
          console.error("Failed to Add" );
          setCartStates((prevStates) => ({
            ...prevStates,
            [productId]: false 
          }));
        }
        
      } catch (error) {
        console.error('Error while adding the product to cart:', error);
        setCartStates((prevStates) => ({
          ...prevStates,
          [productId]: false 
        }));
      }
    };     

 const getProducts = async (): Promise<void> => {
   try {
        const response = await fetch(`${baseURL}/product-category?categoryId=25`, { cache: 'no-store' });
        const data = await response.json();
        console.log(response);
         setProducts(data.data);
         } catch (error) {
         console.error('Error fetching products:', error);
           }
         };            
return (  
            
 <div className='p-6'>
  <h1 className="text-3xl font-bold ">Top Collections</h1>
  <div className="flex justify-center">
  {prodct.map((product) => (
      <div key={product.id}>
        <div className="max-w-sm collection_top rounded-3xl overflow-hidden shadow-xl m-4 w-56 relative">
          <div className="relative px-4 h-44">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-48 h-44 object-cover cursor-pointer"           
            />
          </div>
    <div className="px-6 py-2 collection_bottom relative grid grid-cols-2 ">
  <div>
    <h1 className="text-sm font-bold">{product.name}</h1>
    <p className="text-xs text-gray-700 mt-1">In Stock: {product.stockQuantity}</p>
    {/* <div className="flex flex-col items-center ">
      <Rating style={{ maxWidth: 250 }} value={product.rating} readOnly /> */}
      {/* <p className="text-xs text-yellow-500 ">{product.rating}</p> not needed */}
      {/* <p className="text-xs font-bold">In {product.reviews} reviews</p>
    </div> */}
  </div>
  <div className="flex flex-col items-end">
    <span className="text-sm text-slate-400 line-through">${product.price}</span>
    <span className="text-sm font-bold">${product.offerPrice}</span>
    <span
                      className=" absolute bottom-3 right-2 cursor-pointer"
                      onClick={() => addtoCart(product.id)}
                    >
                    {cartStates[product.id] ? <IoCartSharp /> : <IoCartOutline />}
                    </span>
  </div>
</div>

  


        </div>
      </div>
    ))}
  </div>
  <Toaster richColors />
</div>


  );
    
}; 
         
        
      
    

export default ProductPage;

