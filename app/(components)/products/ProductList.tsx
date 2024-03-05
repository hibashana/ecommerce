"use client"


// import { IoCartOutline, IoCartSharp } from "react-icons/io5";
// import { IoMdHeartEmpty } from "react-icons/io";
// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// interface Phone {
//   id: number;
//   name: string;
//   description:string;
//   stockQuantity: number;
//   offer_price: number;
//   actual_price: number;
//   image: string;
//   offer: string;
// }

// interface PhoneCarouselProps {
//   phones: Phone[];
// }

// const PhoneCarousel: React.FC<PhoneCarouselProps> = ({ phones }) => {
//   const [cartStates, setCartStates] = useState<boolean[]>(Array(phones.length).fill(false));

//   const handleCartClick = (index: number) => {
//     setCartStates((prevStates) => {
//       const newStates = [...prevStates];
//       newStates[index] = !newStates[index];
//       return newStates;
//     });
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     autoplay: false,
//     pauseOnHover: false,
//   };

//   return (
//     <div className="flex justify-center ">
//       <div className="w-auto overflow-hidden">
//         <Slider {...settings}>
//           {phones.map((phone, index) => (
//             <div key={index} className="w-full pr-5 pb-7">
//               <div className="product_style relative shadow-lg rounded-md">
//                 <p className="absolute rounded-r-full p-1 text-xs top-2 offer_style offer_style:hover ">
//                   -{phone.offer}%
//                 </p>
//                 <div className="p-4">
//                   <div className="absolute right-2 top-2 cursor-pointer">
//                     <IoMdHeartEmpty />
//                   </div>
//                   <img
//                     src={phone.image}
//                     alt={phone.name}
//                     className="mx-auto w-28 h-36 lg:object-cover object-cover justify-center mb-2 rounded-md group-hover:scale-105 duration-300"
//                   />

//                   <hr />
//                   <h2 className="pt-2 text-sm font-medium">{phone.name}</h2>
//                   <h3 className="text-xs font-medium text-gray-600">{phone.description}</h3>
//                   <h3 className="text-xs font-medium text-gray-600">In Stock: {phone.stockQuantity}</h3>
//                   <div className="flex flex-row gap-3">
//                     <p className="font-bold">${phone.offer_price}</p>
//                     <p className="text-slate-500 line-through">
//                       ${phone.actual_price.toFixed(2)}
//                     </p>
//                     <div
//                       className=" absolute right-3 cursor-pointer"
//                       onClick={() => handleCartClick(index)}
//                     >
//                       {cartStates[index] ? <IoCartSharp /> : <IoCartOutline />}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>

//         <style>{`
//           .slick-dots {
//             position: absolute;
//             bottom: 0px;
//             list-style: none;
//             display: flex;
//             justify-content: center;
//             padding: 0;
//           } 
//         `}</style>
//       </div>
//     </div>
//   );
// };

// export default PhoneCarousel;



import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { IoMdHeartEmpty ,IoMdHeart} from "react-icons/io";
import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addtoWishlist } from "@/app/action/wishlist";
import { baseURL, imageURL } from '@/utils/constants';
import { Toaster, toast } from 'sonner';
import  {Product} from '@/types';
import { useRouter } from 'next/navigation';

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   stockQuantity: number;
//   offerPrice: number;
//   price: number;
//   imageUrl: string;
//   offerPercentage: number;
// }

interface ProductsProps {
  products: Product[]; 
}


const Products:FC<ProductsProps> = ({ products }) => {
  const [cartStates, setCartStates] = useState<{ [productId: number]: boolean }>({});
  const [favoriteStates, setFavoriteStates] = useState<{ [productId: number]: boolean }>({});
  const [prodct, setProducts] = useState<Product[]>([]);

  const router=useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOnClick = (name: string) => {
    router.push(`/productDetails/${name}`);
  };

  // const handleOnClick = (name: string) => {
  //   router.push('/components/dummyProduct');
  // };

  const toggleFavorite = (productId: number) => {
    setFavoriteStates(prevStates => ({
      ...prevStates,
      [productId]: !prevStates[productId]
    }));
  };

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
          [productId]: true  // Set the cart state for the specific product to true
        }));
       
      } else {
        
        toast.error("Failed to Add Product to cart");
        console.error("Failed to Add" );
        setCartStates((prevStates) => ({
          ...prevStates,
          [productId]: false  // Set the cart state for the specific product to false
        }));
      }
      
    } catch (error) {
      console.error('Error while adding the product to cart:', error);
      setCartStates((prevStates) => ({
        ...prevStates,
        [productId]: false  // Set the cart state for the specific product to false
      }));
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
 

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
  };

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/product-category?categoryId=19`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className="flex flex-row ">
      <div className="w-full gap-3">
        <Slider {...settings}>
          {prodct.map((item, index) => (
            <div key={index} className="w-full pr-0 px-3">
              <div className="product_style relative shadow-lg rounded-md">
                {item.offerPercentage > 0 && (
                  <p className="absolute rounded-r-full p-1 text-xs top-2 offer_style offer_style:hover">
                    -{item.offerPercentage}%
                  </p>
                )}
                <div className="p-4">
                <div className="absolute right-2 top-2 cursor-pointer" onClick={() => handleWishlist(item.id)}>
                    {favoriteStates[item.id] ? (
                      <IoMdHeart onClick={() => toggleFavorite(item.id)} style={{ color: 'red' }} />
                    ) : (
                      <IoMdHeartEmpty onClick={() => toggleFavorite(item.id)} />
                    )}
                  </div>

                  <img
                    src={item.imageUrl ? `${imageURL}${item.imageUrl}` : "https://media.ldlc.com/ld/products/00/04/65/15/LD0004651580_2.jpg"}
                    alt={item.name}
                    onClick={() => handleOnClick(item.name)}
                    className="mx-auto cursor-pointer w-32 h-44 lg:object-cover object-cover justify-center mb-2 rounded-md group-hover:scale-105 duration-300"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://img.freepik.com/premium-photo/colourful-smokes-mobile-screen-image-generative-ai_849906-7067.jpg';
                    }}
                  />

                  <hr />
                  <h2 className="pt-2 text-sm font-medium">{item.name}</h2>
                  <h3 className="text-xs font-medium text-gray-600">{item.description}</h3>
                  <h3 className="text-xs font-medium text-gray-600">In Stock: {item.stockQuantity}</h3>
                  <div className="flex flex-row gap-3">
                    {item.offerPercentage > 0 ? (
                      <p className="font-bold">${item.offerPrice}</p>
                    ) : (
                      <p className="text-black font-bold">${item.price}</p>
                    )}
                    {item.offerPercentage > 0 && (
                      <p className="text-slate-500 line-through">${item.price}</p>
                    )}
                    <div
                      className=" absolute right-2 cursor-pointer"
                      onClick={() => addtoCart(item.id)}
                    >
                    {cartStates[item.id] ? <IoCartSharp /> : <IoCartOutline />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <style>{`
          .slick-dots {
            position: absolute;
            bottom: 0px;
            list-style: none;
            display: flex;
            justify-content: center;
            padding: 0;
          } 
        `}</style>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Products;
