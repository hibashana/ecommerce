
"use client"
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { ImCross } from "react-icons/im";
import { getWishlist } from '../action/wishlist';
import { Toaster, toast } from 'sonner';
import { imageURL } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { addtoWishlist } from "../action/wishlist";

const MiniWishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const router = useRouter();


  const getWishlistItems = async (): Promise<void> => {
    try {
      const { data, status } = await getWishlist();
      if (status === 200) {
        setWishlist(data.data);
      } else if (status === 401) {
        router.push('/login');
      } else {
        console.error('Error in Wishlist. Status:', status);
      }
    } catch (error) {
      console.error('Error:', error);
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

  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <div className="fixed top-0 right-0 z-50 w-96 bg-gray-50 h-screen overflow-y-auto shadow-lg">
      <div className='p-5'>
        <h1 className='border-b-2 pt-1 pb-5 text-xl font-semibold'>Shopping Wishlist</h1>
        <div>
          <div className="flex flex-col">
            <table className="table-fixed p-2">
              <tbody className="text-center border-b">
                {wishlist.map((product) => (
                  <tr className="" key={product.id}>
                    <td className="w-1/4 pb-3 pt-3 ">
                      <div className="flex flex-row gap-1 items-center">
                        <div className="block w-28 h-28 rounded-md overflow-hidden">
                          <img src={`${imageURL}${product.imageUrl}`} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </td>
                    <td className="px-2 relative">
  <div className="flex flex-row items-center">
    <p className="text-lg px-1 font-semibold">{product.name}</p>
  </div>
     <div
         className="absolute right-0 bottom-16 p-2 rounded-full hover:text-red-700 bg-white text-gray-400 text-xs cursor-pointer"
         onClick={() => handleWishlist(product.id)}
          >
         <ImCross />
     </div>
  {/* <div className="absolute right-1 bottom-16 cursor-pointer text-xl text-red-600 hover:text-red-200" onClick={() => handleWishlist(product.id)}>
    <IoIosHeart />
  </div> */}
  <div className="absolute right-1 bottom-6 cursor-pointer text-lg hover:text-blue-600">
    <FaShoppingCart /> 
  </div>
  <div>
    <div className="flex flex-row gap-3">
      {product.offerPercentage > 0 ? (
        <p className="text-lg font-bold">${product.offerPrice}</p>
      ) : (
        <p className="text-lg font-bold">${product.price}</p>
      )}
      {product.offerPercentage > 0 && (
        <p className="text-slate-500 text-sm line-through m-1">${product.price}</p>
      )}
    </div>
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div className="pt-5 flex items-center justify-center text-center pb-5">
              <div className="fixed w-full bottom-0 pb-4">
                <Link href={"/addtoCart"}>
                  <button 
                    className="text-white bg-primary-color hover:bg-blue-800 p-2 rounded-lg text-sm"
                    onClick={() => console.log("Add to cart clicked")}>
                    Add to cart
                  </button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
        <Toaster richColors />
      </div>
    </div>
  );
};

export default MiniWishlist;
