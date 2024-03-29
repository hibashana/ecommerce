"use client"
import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product,ProductImage } from '@/types';
import { baseURL,imageURL } from "@/utils/constants";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from "axios";

interface RecommendedProductProps {
  product: Product[];
}

const RecmdProduct: React.FC<RecommendedProductProps> = ({ product }) => {
  const [cartStates, setCartStates] = useState<{ [productId: number]: boolean }>({});
  const [prodct, setProducts] = useState<Product[]>([]);
  // const products = [
  //   { id: 1, name: 'Orient Watch', imageUrl: '/ORIENT_BLACKGOLD3-2.jpg', offer_price: 15, actual_price: 20 },
  //   { id: 2, name: 'Gaming Mouse', imageUrl: '/mouse.jpg', offer_price: 10, actual_price: 15 },
  //   { id: 3, name: 'Curved TV', imageUrl: '/smart-tvs.jpg', offer_price: 15, actual_price: 20 },
  //   { id: 4, name: 'Gaming Headset', imageUrl: '/headset.jpg', offer_price: 15, actual_price: 20 },
  //   { id: 5, name: 'Oppo Mobiles', imageUrl: '/oppo.jpg', offer_price: 25, actual_price: 20 },
  // ];
  const router=useRouter();

  useEffect(() => {
    getRecommendedProducts();
  }, []);

  const addtoCart = async (productId: number): Promise<void> => {

    const token = localStorage.getItem('token');
    console.log(token);
    
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
 

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };


  const getRecommendedProducts = async (): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/product-category?categoryId=24`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="p-4 ">
      <h1 className="text-3xl font-bold mb-4">Recommended</h1>

      <div className="flex flex-row  justify-center gap-4">
        {/* <Slider {...sliderSettings}> */}
        <div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'></div>
          {prodct.map((product) => (
          <div key={product.id} className="relative overflow-hidden group">
            <img
              src={product.imageUrl}
              alt={product.name}
              className=" w-56 h-64 object-cover  rounded-md"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-2 group-hover:bg-black group-hover:bg-opacity-75 transition-all">
              <p className="text-white text-center">{product.name}</p>
              <div className="text-center">
                <button className="shopnow text-center justify-center p-1 text-sm">Shop Now</button>
              </div>
            </div>
            <div className="absolute  bottom-0 left-0 right-0 transform translate-y-full  group-hover:opacity-100 group-hover:translate-y-0 transition-all">
              <div className="collection_bottom p-2">
                <p className="">{product.name}</p>
                  <div className='flex flex-row gap-2'>
                   <p className="font-bold">${product.offerPrice}</p>
                   <p className="text-slate-500 p-1 text-sm  line-through">${product.price}</p>
                   <div
                      className=" absolute right-2 cursor-pointer"
                      onClick={() => addtoCart(product.id)}
                    >
                    {cartStates[product.id] ? <IoCartSharp /> : <IoCartOutline />}
                    </div>
                  </div>
                  
              </div>
            </div>
          </div>
        ))}
        {/* </Slider> */}
      </div>
      <Toaster richColors />
    </div>
  );
};

export default RecmdProduct;



// const RecmdProduct = () => {
//   const products = [
//     { id: 1, name: 'Orient Watch', imageUrl: '/ORIENT_BLACKGOLD3-2.jpg', offer_price: 15, actual_price: 20 },
//     { id: 2, name: 'Gaming Mouse', imageUrl: '/mouse.jpg', offer_price: 10, actual_price: 15 },
//     { id: 3, name: 'Curved TV', imageUrl: '/smart-tvs.jpg', offer_price: 15, actual_price: 20 },
//     { id: 4, name: 'Gaming Headset', imageUrl: '/headset.jpg', offer_price: 15, actual_price: 20 },
//     { id: 5, name: 'Oppo Mobiles', imageUrl: '/oppo.jpg', offer_price: 25, actual_price: 20 },
//   ];

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="p-4 ">
//       <h1 className="text-3xl font-bold mb-4">Recommended</h1>

//       <div className="flex flex-row  justify-center gap-4">
//         {/* <Slider {...sliderSettings}> */}
//         <div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'></div>
//         {products.map((product) => (
//           <div key={product.id} className="relative overflow-hidden group">
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className=" w-56 h-64 object-cover  rounded-md"
//             />
//             <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-end p-2 group-hover:bg-black group-hover:bg-opacity-75 transition-all">
//               <p className="text-white text-center">{product.name}</p>
//               <div className="text-center">
//                 <button className="shopnow text-center justify-center p-1 text-sm">Shop Now</button>
//               </div>
//             </div>
//             <div className="absolute  bottom-0 left-0 right-0 transform translate-y-full  group-hover:opacity-100 group-hover:translate-y-0 transition-all">
//               <div className="collection_bottom p-2">
//                 <p className="">{product.name}</p>
//                   <div className='flex flex-row gap-2'>
//                    <p className="font-bold">${product. offer_price}</p>
//                    <p className="text-slate-500 p-1 text-sm  line-through">${product. offer_price}</p>
//                    <div className='mx-28 cursor-pointer'>
//                     <IoCartOutline/>
//                   </div>
//                   </div>
                  
//               </div>
//             </div>
//           </div>
//         ))}
//         {/* </Slider> */}
//       </div>
//     </div>
//   );
// };

// export default RecmdProduct;


// $('.multiple-items').slick({
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 3
// });