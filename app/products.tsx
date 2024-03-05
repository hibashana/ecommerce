import React, { useState ,useRef,useEffect} from 'react';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { MdShare, MdCompareArrows } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { baseURL,imageURL } from '@/utils/constants';
import { Product ,ProductbyCategory} from "@/types";
import addtoCart from '@/app/action/cart';
import getSubCategoryData from '@/app/action/subCategory'
import MiniCart from './minicart/page';
import { addtoWishlist } from './action/wishlist';
import { getWishlist } from './action/wishlist';
import { Rating } from "@smastrom/react-rating";

interface ProductsProps {
    product: ProductbyCategory[];
}

const Products: React.FC<ProductsProps> = ({ product }) => {
    const router = useRouter();
    const [miniCartVisible, setMiniCartVisible] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [products, setProducts] = useState<ProductbyCategory[]>([]);

    // const miniCartRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     // Function to handle clicks outside the mini cart
    //     function handleClickOutside(event: MouseEvent) {
    //         if (miniCartRef.current && !miniCartRef.current.contains(event.target as Node)) {
    //             setMiniCartVisible(false); // Hide the mini cart if clicked outside
    //         }
    //     }

    //     // Add event listener to detect clicks outside the mini cart
    //     document.addEventListener('mousedown', handleClickOutside);

    //     // Cleanup function to remove event listener
    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    
    const handleAddToCart = async (productId: number) => {
        const status = await addtoCart(productId);
        if (status === 200) {
            toast.success("Product Added to cart");
            // setMiniCartVisible(true);
            // setShowOverlay(true);
        } else if (status === 401) {
            router.push('/login');
        } else {
            toast.error("Failed to Add Product to cart");
        }
    };


    
//  const handleWishlist = async (productId: number) => {
//         const status = await addtoWishlist(productId);
//         if (status === 200) {
//             toast.success("Product Added to wishlist");
//             window.location.reload();
//             // setMiniwishlistVisible(true);
//         } else if (status === 401) {
//             router.push('/login');
//         } else {
//             toast.error("Failed to Add Product to wishlist");
//         }
//       };
   

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
    <div>
        <div>
        {showOverlay && <div className='bg-black opacity-40 fixed top-0 bottom-0 left-0 w-full h-full' />}
        <div className='flex flex-wrap justify-center'>   
            {product.map((prod, index) => (
                
                <div key={index} className='px-2 relative '>
                            {showOverlay && <div className='bg-black/0 opacity-40 fixed top-0 bottom-0 left-0 w-full h-full' />}
                    <div className=''>
                        
                        <div className="flex flex-col w-64  h-fit group pt-4 cursor-pointer relative">
                            <div className="bg-sky-50 w-full h-72 relative  ">
                                {prod.offerPercentage > 0 && (
                                    <p className="absolute rounded-full w-9 h-9 flex justify-center items-center text-white text-xs right-2 top-2" style={{ backgroundColor: '#f87171' }}>
                                        -{prod.offerPercentage}%
                                    </p>
                                )}
                                <img
                                    src={prod.imageUrl ? `${imageURL}${prod.imageUrl}` : "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg "}
                                    alt={prod.name}
                                    className="w-full h-full object-cover"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg ';
                                    }}
                                />
                                <div className="absolute h-full w-full bg-black/60 flex flex-col items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-95 transition-all duration-300">
                                    <button className="bg-white text-yellow-600 font-semibold py-2 px-6" onClick={() => handleAddToCart(prod.id)}>Add to cart</button>
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
                                            <GoHeart className='text-lg font-semibold'
                                              onClick={() => handleWishlist(prod.id)} />
                                            <div className="p-1" >Like</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col px-3 gap-1 py-1 relative z-10" style={{ backgroundColor: '#F4F5F7' }}>
                                <h2 className="text-lg font-semibold">{prod.name}</h2>
                                <p className="text-gray-600 text-xs">{prod.description}</p>
                                <div className="flex flex-col">
                    {/* <Rating style={{ maxWidth: 100 }} value={parseFloat(prod.Review?.averageRating || "0")} readOnly /> */}
                    {parseFloat(prod.Review?.averageRating || "0") > 0 && (
                                        <div className="flex flex-col">
                                            <Rating style={{ maxWidth: 100 }} value={parseFloat(prod.Review?.averageRating || "0")} readOnly />
                                        </div>
                                    )}
                  </div>
                                <div className="flex flex-row gap-3">
                                    {prod.offerPercentage > 0 ? (
                                        <p className="font-bold">${prod.offerPrice}</p>
                                    ) : (
                                        <p className="text-black font-bold">${prod.price}</p>
                                    )}
                                    {prod.offerPercentage > 0 && (
                                        <p className="text-slate-500 line-through">${prod.price}</p>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
        <Toaster richColors />
        {/* {miniCartVisible && <div className='absolute top-0 left-0 w-full h-full '><MiniCart /></div>} */}
    </div>
)   
}

export default Products;



