
"use client"
import React, { useState, useEffect } from "react";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { Product, ProductbyCategory } from "@/types";
import { baseURL } from "@/utils/constants";
import { Rating } from "@smastrom/react-rating";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

import "@smastrom/react-rating/style.css";

interface ProductProps {
  product: ProductbyCategory[];
}

const ProductPage: React.FC<ProductProps> = ({ product }) => {
  const [cartStates, setCartStates] = useState<{ [productId: string]: boolean }>({});
  const [products, setProducts] = useState<ProductbyCategory[]>([]);
  const [rating, setRating] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    getProducts();
  }, []);

  const addtoCart = async (productId: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/cart/addToCart?productId=${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Product Added to cart");
        setCartStates((prevStates) => ({
          ...prevStates,
          [productId]: true,
        }));
      } else {
        toast.error("Failed to Add Product to cart");
        console.error("Failed to Add");
        setCartStates((prevStates) => ({
          ...prevStates,
          [productId]: false,
        }));
      }
    } catch (error) {
      console.error("Error while adding the product to cart:", error);
      setCartStates((prevStates) => ({
        ...prevStates,
        [productId]: false,
      }));
    }
  };

  const getProducts = async (): Promise<void> => {
    try {
      const response = await fetch(`${baseURL}/product-category?categoryId=25&&rating`, {
        cache: "no-store",
      });
      const data = await response.json();
      console.log(data);
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Top Collections</h1>
      <div className="flex justify-center">
        {products.map((product) => (
          <div key={product.id}>
            <div className="max-w-sm collection_top rounded-3xl overflow-hidden shadow-xl m-4 w-56 relative">
              <div className="relative px-4 h-44">
                <img src={product.imageUrl} alt={product.name} className="w-48 h-44 object-cover cursor-pointer" />
              </div>
              <div className="px-6 py-2 collection_bottom relative grid grid-cols-2">
                <div>
                  <h1 className="text-sm font-bold">{product.name}</h1>
                  <p className="text-xs text-gray-700 mt-1">In Stock: {product.stockQuantity}</p>
                  <div className="flex flex-col items-center">
                    <Rating style={{ maxWidth: 250 }} value={parseFloat(product.Review?.averageRating || "0")} readOnly />
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-400 line-through">${product.price}</span>
                  <span className="text-sm font-bold">${product.offerPrice}</span>
                  <span className="absolute bottom-3 right-2 cursor-pointer" onClick={() => addtoCart(product.id.toString())}>
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
