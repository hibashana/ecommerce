
"use client"
import React, { useEffect, useState } from "react";
import { CartData, CartItem, Product } from "@/types";
import { ImCross } from "react-icons/im";
import getCartWithItems from "../action/getCartWithItems";
import { incrementQuantity, removeFromCart } from "../action/quantity";
import { decrementQuantity } from "../action/quantity";
import { Toaster, toast } from 'sonner';
import { imageURL } from "@/utils/constants";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const MiniCart = () => {
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const router = useRouter();

  const handleViewCartClick = () => {
    setShowMiniCart(false); // Close the mini cart when "VIEW AND EDIT CART" is clicked
  };

  const getCart = async () => {
    try {
      const { data, status } = await getCartWithItems();
      if (status === 200) {
        setCartData(data.data);
      } else if (status === 401) {
        router.push('/login');
      } else {
        console.error('Error fetching cart data. Status:', status);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const incrementCart = async (cartItemId: string): Promise<void> => {
    try {
      const status = await incrementQuantity(cartItemId);
      if (status === 200) {
        console.log(`Product quantity incremented.`);
        getCart();
      } else {
        console.error('Error incrementing quantity. Status:', status);
      }
    } catch (error) {
      console.error('Error incrementing quantity:', error);
    }
  };

  const decrementCart = async (cartItemId: string): Promise<void> => {
    try {
      const status = await decrementQuantity(cartItemId);
      if (status === 200) {
        console.log(`Product removed.`);
        getCart();
      } else {
        console.error("Failed to remove");
      }
    } catch (error) {
      console.error('Error while removing product:', error);
    }
  };

  const removeCart = async (cartItemId: string): Promise<void> => {
    try {
      const status = await removeFromCart(cartItemId);
      if (status === 200) {
        toast.success(`Deleted Successfully.`);
        console.log(`Product has been deleted.`);
        getCart();
      } else {
        toast.error("Failed to delete Product");
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error('Error while deleting products:', error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="fixed top-0 right-0 z-50 w-96 bg-gray-50 h-screen overflow-y-auto shadow-lg">
      <div className='p-3'>
        <h1 className='border-b-2 pt-1 pb-5 text-xl font-semibold'>Shopping Cart</h1>
        <div>
          <div className="flex flex-col">
            <table className="table-fixed p-2">
              <tbody className="text-center">
                {cartData?.cartItems.map((data: CartItem) => (
                  <tr className="" key={data.id}>
                    <td className="w-1/4 pb-1 pt-2">
                      <div className="flex flex-row gap-1 items-center">
                        <div className="block w-28 h-28 rounded-md overflow-hidden">
                          <img src={`${imageURL}${data.Product.imageUrl}`} alt={data.Product.name} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    </td>
                    <td className="px-2">
  <div className="flex flex-row items-center">
    <p className="text-lg px-1 font-semibold">{data.Product.name}</p>
  </div>
  <div>
  <div className="flex flex-row relative items-center">
  <button
    data-action="decrement"
    className="border hover:bg-gray-100 bg-white rounded-l cursor-pointer outline-none h-8 w-8 flex items-center justify-center"
    onClick={() => decrementCart(data.id)}
  >
    <span className="text-4xl font-thin">-</span>
  </button>
  <input
    type="number"
    className="border text-center w-12 items-center justify-center text-base flex h-8"
    name="custom-input-number"
    value={data.quantity}
    readOnly
  />
  <button
    className="border bg-white hover:bg-gray-100 rounded-r cursor-pointer h-8 w-8 flex items-center justify-center"
    onClick={() => incrementCart(data.id)}
  >
    <span className="text-2xl font-thin">+</span>
  </button>
  <p className="px-3 text-base">{data.amount}</p>
</div>

  </div>
</td>

                    <td className="">
                      <div>
                        <div
                          className=" p-2  rounded-full hover:text-red-700 bg-white text-gray-400 text-xs cursor-pointer "
                          onClick={() => removeCart(data.id)}
                        >
                          <ImCross />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {cartData && (
              <div className="absolute text-lg font-bold bottom-20 right-2 flex justify-between mt-3 pt-4">
              <div className="absolute -left-60 flex justify-between ">
                <span>Total</span>   
              </div>
              <span className="font-color font-bold">{cartData.subTotal}</span>
              </div>
            )}

<div className="pt-5 flex items-center justify-center text-center pb-5">
  <div className="fixed w-full bottom-0 pb-4">
    <Link href={"/addtoCart"}>
      <button 
        className="text-white bg-primary-color hover:bg-blue-800 p-2 rounded-lg text-sm"
        onClick={handleViewCartClick}>
        VIEW AND EDIT CART
      </button>
    </Link>
  </div>
</div>
          </div>
        </div>
        <Toaster richColors />
      </div>
    </div>
  );
};

export default MiniCart;
