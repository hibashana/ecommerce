"use client"
import React, { useState, useEffect } from 'react';
import { baseURL,imageURL } from '@/utils/constants';
import { CategoryItem,SubCategoryItem ,Product} from "@/types";
// import { useSearchParams } from 'next/navigation';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { BsGridFill } from "react-icons/bs";
import { BsViewList } from "react-icons/bs";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { MdSupportAgent,MdShare,MdCompareArrows} from "react-icons/md";
import { useRouter } from 'next/navigation';
import { GoHeartFill } from "react-icons/go";
import { Toaster, toast } from 'sonner';
import addtoCart from '@/app/action/cart';
import fetchCategoryData from '@/app/action/productlist';
import getSubCategoryData from '@/app/action/subCategory';
import Products from '@/app/products';
import { Rating } from "@smastrom/react-rating";

// import { addtoCart }from "@/app/action/get-cart"
// import Products from '@/app/products';



const ProductbyCategory = () => {
    const [categoryData, setCategoryData] = useState<string | null>(null);
    const [subCategoryData, setSubCategoryData] = useState<SubCategoryItem[]>([]);
    const [product, setProductData] = useState<Product[]>([]);

    useEffect(() => {
        getCategoryData();
    }, []);
    const router=useRouter();

    // const getCategoryData = async () => {
    //     try {
    //         const parentId = window.location.pathname.split('/').pop();
    //         const response = await fetch(`${baseURL}/category/${parentId}`, { cache: 'no-store' });
    //         const data = await response.json();
    //         console.log(data);
    //         setCategoryData(data.name);
    //         setSubCategoryData(data.children);
    //         setProductData(data.Products)
    //     } catch (error) {
    //         console.error('Error fetching category:', error);
    //     }
    // };

    const getCategoryData = async () => {
        try {
            const data = await fetchCategoryData();
            setCategoryData(data.name);
            setSubCategoryData(data.children);
            setProductData(data.Products);
        } catch (error: any) {
            console.error((error as Error).message);
        }
    };
    

    const subCategory = async (categoryId: number) => {
        try {
            const { data, status } = await getSubCategoryData(categoryId);
            if (status === 200) {
                setProductData(data.data); 
            } else {
                console.error('Error fetching subcategory. Status:', status);
            }
        } catch (error) {
            console.error('Error fetching subcategory:', error);
        }
    };

    return (
        <div className='mb-3 p-2'>
            <div>
                {categoryData && (
                    <div>
                        <div className="">
                            <img className='w-full h-44' />
                            {/* <h1>{categoryData}</h1> */}
                        </div>
                        {subCategoryData.length > 0 && (
                            <div className="px-3 py-1 pt-8">
                                <div className='flex flex-row justify-center gap-2'>
                                    {subCategoryData.map((subcategory, index) => (
                                        <div key={index} onClick={() => subCategory(subcategory.id)}>
                                            <img src={subcategory.imageUrl ? `${imageURL}${subcategory.imageUrl}` : "https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg "} alt={subcategory.name}
                                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg ';
                                                }}
                                                className='w-20 gap-2 h-20 rounded-full cursor-pointer'
                                               
                                            />
                                            <p className='px-4 '>{subcategory.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className='mt-5 w-full h-20 px-28 ' style={{ backgroundColor: '#F9F1E7' }}>
                            <div className='flex flex-row gap-8  p-5 items-center'>
                                <div className="flex items-center pb-1 pt-2 gap-2  hover:font-semibold">
                                    <div><HiAdjustmentsHorizontal /></div>
                                    <div>Filter</div>
                                </div>
                                <div><BsGridFill /></div>
                                <div><BsViewList /></div>
                                <div className='text-sm font-medium border-l-2 h-12 border-gray-300 pl-6 py-4'>Showing 1-16 of 32 results</div>
                                   {/* pagination */}
                                <div className='flex gap-12 ml-auto'>
                                    <div className="">Show <span className='bg-white p-2   text-gray-500'>16</span></div>
                                    <div>Sort by<span className='bg-white p-2  text-gray-500'>Default</span></div>
                                </div>
                            </div>
                        </div>

                        <Products product={product}/>
               
                        <div className='mt-5 w-full h-36 px-28 ' style={{ backgroundColor: '#F9F1E7' }}>
                            <div className='p-6'>
                            <div className='flex flex-row gap-8 justify-center py-5 items-center'>
                                <div className="flex items-center pb-1 pt-2 gap-2">
                                    <div className='text-5xl'><HiOutlineTrophy /></div>
                                    <div className='flex flex-col'>
                                    <div className='font-semibold'>High Quality</div>
                                    <div className=' text-gray-500'>product from good materials</div>
                                    </div>
                                </div>
                                <div className="flex items-center pb-1 pt-2 ">
                                    <div className='text-5xl'><HiOutlineTrophy /></div>
                                    <div className='flex flex-col'>
                                    <div className='font-semibold'>Warranty Protection</div>
                                    <div className='text-gray-500'>Over 2 years</div>
                                    </div>
                                </div>
                                <div className="flex items-center pb-1 pt-2 gap-2">
                                    <div className='text-5xl'><FaHandHoldingUsd/></div>
                                    <div className='flex flex-col'>
                                    <div className='font-semibold'>Free Shipping</div>
                                    <div className='text-gray-500'>Order over $100</div>
                                    </div>
                                </div>
                                <div className="flex items-center pb-1 pt-2 gap-2">
                                    <div className='text-5xl'><MdSupportAgent/></div>
                                    <div className='flex flex-col'>
                                    <div className='font-semibold'>24/7 Support</div>
                                    <div className='text-gray-500'>Dedicated support</div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Toaster richColors />
        </div>
    );
};

export default ProductbyCategory;


 

  