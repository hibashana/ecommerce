
"use client"
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { ImCross } from "react-icons/im";
import { getWishlist } from '../action/wishlist';
import { Toaster } from 'sonner';
import { imageURL } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FaShoppingCart } from "react-icons/fa";

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
              <tbody className="text-center">
                {wishlist.map((product) => (
                  <tr className="" key={product.id}>
                    <td className="w-1/4 pb-1 pt-2">
                      <div className="flex flex-row gap-1 items-center">
                        <div className="block w-28 h-28 rounded-md overflow-hidden">
                          <img src={`${imageURL}${product.imageUrl}`} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </td>
                    <td className="px-2">
                      <div className="flex flex-row items-center">
                        <p className="text-lg px-1 font-semibold">{product.name}</p>
                      </div>
                      <div className="absolute right-10 cursor-pointer hover:text-blue-600">
                      <FaShoppingCart /> 
                      </div>
                      <div>
                      <div className="flex flex-row gap-3">
                                    {product.offerPercentage > 0 ? (
                                        <p className="font-bold">${product.offerPrice}</p>
                                    ) : (
                                        <p className="text-black font-bold">${product.price}</p>
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
