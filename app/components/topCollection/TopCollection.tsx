"use client"
import React,{useState} from 'react';
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

const ProductPage = () => {

  const [rating, setRating] = useState(0)
  const products = [
    {
      id:1,
      name: 'Iphone 13',
      actualPrice: 45.00,
      offerPrice: 32.98,
      stock: 10,
      rating: 4.5,
      reviews: 8,
      imageUrl: '/iPhone-13-Tt.png',
    },
    {
      id:2,
      name: 'Sades',
      actualPrice: 14.90,
      offerPrice: 12.98,
      stock: 15,
      rating: 4.2,
      reviews: 256,
      imageUrl: '/sades.png', 
    },
    
    {
      id:4,
      name: 'Led Tv',
      actualPrice: 14.90,
      offerPrice: 12.98,
      stock: 15,
      rating: 4.2,
      reviews: 256,
      imageUrl: '/ledTv.png', 
    },
    {
      id:5,
      name: 'Sades',
      actualPrice: 14.90,
      offerPrice: 12.98,
      stock: 15,
      rating: 4.2,
      reviews: 256,
      imageUrl: '/sades.png', 
    },{
      id:3,
      name: 'Asus',
      actualPrice: 68.90,
      offerPrice: 65.98,
      stock: 24,
      rating: 2.5,
      reviews: 56,
      imageUrl: '/asus-laptop.png',
    },
  ];

//   const addToCart = (product) => {
//     // Add your logic to handle adding the product to the cart
//     console.log('Product added to cart:', product);
//   };


{/* <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              /> */}
              return (
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
            
 <div className='p-6'>
  <h1 className="text-3xl font-bold ">Top Collections</h1>
  <div className="flex ">
    {products.map((product) => (
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
    <p className="text-xs text-gray-700 mt-1">In Stock: {product.stock}</p>
    <div className="flex flex-col items-center ">
      <Rating style={{ maxWidth: 250 }} value={product.rating} readOnly />
      {/* <p className="text-xs text-yellow-500 ">{product.rating}</p> */}
      <p className="text-xs font-bold">In {product.reviews} reviews</p>
    </div>
  </div>
  <div className="flex flex-col items-end">
    <span className="text-sm text-slate-400 line-through">${product.actualPrice.toFixed(2)}</span>
    <span className="text-sm font-bold">${product.offerPrice.toFixed(2)}</span>
    <span className='absolute bottom-3 cursor-pointer'><IoCartOutline/></span> 
  </div>
</div>

  


        </div>
      </div>
    ))}
  </div>
</div>


  );
    
}; 
         
        
      
    

export default ProductPage;

