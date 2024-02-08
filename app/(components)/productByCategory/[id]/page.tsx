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
import { MdSupportAgent } from "react-icons/md";


const ProductbyCategory = () => {
    const [categoryData, setCategoryData] = useState<string | null>(null);
    const [subCategoryData, setSubCategoryData] = useState<SubCategoryItem[]>([]);
    const [product, setProductData] = useState<Product[]>([]);

    useEffect(() => {
        getCategoryData();
    }, []);

    const getCategoryData = async () => {
        try {
            const parentId = window.location.pathname.split('/').pop();
            const response = await fetch(`${baseURL}/category/${parentId}`, { cache: 'no-store' });
            const data = await response.json();
            console.log(data);
            setCategoryData(data.name);
            setSubCategoryData(data.children);
            setProductData(data.Products)
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    const getSubCategoryData = async (parentId: number) => {
        try {
            const response = await fetch(`${baseURL}/category/${parentId}`, { cache: 'no-store' });
            const data = await response.json();
            console.log(data);
            setProductData(data.Products)
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };


    // const getsubCategory = async () => {
    //     try {
    //         const parentId = window.location.pathname.split('/').pop();
    //         const response = await fetch(`${baseURL}/category?parentId=${parentId}`, { cache: 'no-store' });
    //         const data = await response.json();
    //         console.log(data);
    //         setSubCategoryData(data.data);
    //     } catch (error) {
    //         console.error('Error fetching subcategories:', error);
    //     }
    // };

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
                                        <div key={index} onClick={() => getSubCategoryData(subcategory.id)}>
                                            <img src={subcategory.imageUrl ? `${imageURL}${subcategory.imageUrl}` : "https://i.blogs.es/7342c1/iphone-13-1-/840_560.jpg"} alt={subcategory.name}
                                              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = 'https://img.freepik.com/premium-photo/colourful-smokes-mobile-screen-image-generative-ai_849906-7067.jpg';
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
                        <div className='flex flex-wrap justify-center'>
                            {product.map((product, index) => (
                                <div key={index} className='px-2 relative '>
                                    <div>
                                    <div className="flex flex-col w-64  pt-4 cursor-pointer hover:opacity-30 relative">
                                    <div className="bg-sky-50 w-full h-72 relative">
                                        {product.offerPercentage > 0 && (
                                        <p className="absolute rounded-full w-9 h-9 flex justify-center items-center text-white text-xs right-2 top-2" style={{ backgroundColor: '#f87171' }}>
                                         -{product.offerPercentage}%
                                        </p>
                                          )}
                                       <img
                                     src={product.imageUrl ? `${imageURL}${product.imageUrl}` : "https://i.blogs.es/7342c1/iphone-13-1-/840_560.jpg"}
                                     alt={product.name}
                                     className="w-full h-full object-cover"
                                     onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                     const target = e.target as HTMLImageElement;
                                     target.src = 'https://img.freepik.com/premium-photo/colourful-smokes-mobile-screen-image-generative-ai_849906-7067.jpg';
                                     }}
                                     />
                                    </div>

                                        <div className="flex flex-col px-3 gap-1 py-1 relative z-10" style={{ backgroundColor: '#F4F5F7' }}>
                                            <h2 className="text-lg font-semibold">{product.name}</h2>
                                            <p className="text-gray-600 text-xs">{product.description}</p>
                                            <div className="flex flex-row gap-3">
                                                {product.offerPercentage > 0 ? (
                                                    <p className="font-bold">${product.offerPrice}</p>
                                                ) : (
                                                    <p className="text-black font-bold">${product.price}</p>
                                                )}
                                                {product.offerPercentage > 0 && (
                                                    <p className="text-slate-500 line-through">${product.price}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center  rounded-md p-2 opacity-0 transition-opacity duration-300  hover:opacity-100 ">
                                            <button className="text-center py-1 px-2 bg-blue-500 text-white rounded-md mb-1">Add to Cart</button>
                                            <div className='flex flex-row text-center text-white gap-3 py-1 px-2'>
                                                <div className="">Share</div>
                                                <div className="">Compare</div>
                                                <div className="">Like</div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='mt-5 w-full h-36 px-28 ' style={{ backgroundColor: '#F9F1E7' }}>
                            <div className='p-6'>
                            <div className='flex flex-row gap-8  p-5 items-center'>
                                <div className="flex items-center pb-1 pt-2 gap-2">
                                    <div className='text-5xl'><HiOutlineTrophy /></div>
                                    <div className='font-semibold'>High Quality</div>
                                    <div className='text-gray-500'>product from good materials</div>
                                </div>
                                <div className="flex items-center pb-1 pt-2 ">
                                    <div className='text-5xl'><HiOutlineTrophy /></div>
                                    <div className='font-semibold'>Warranty Protection</div>
                                    <div className='text-gray-500'>Over 2 years</div>
                                </div>
                                <div className="flex items-center pb-1 pt-2 gap-2">
                                    <div className='text-5xl'><FaHandHoldingUsd/></div>
                                    <div className='font-semibold'>Free Shipping</div>
                                    <div className='text-gray-500'>Order over $100</div>
                                </div>
                                <div className="flex items-center pb-1 pt-2 gap-2">
                                    <div className='text-5xl'><MdSupportAgent/></div>
                                    <div className='font-semibold'>24/7 Support</div>
                                    <div className='text-gray-500'>Dedicated support</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductbyCategory;


 

  