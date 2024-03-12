"use client"
import React, { useState, useEffect } from 'react';
import { baseURL, imageURL } from '@/utils/constants';
import { SubCategoryItem } from "@/types";
import type { ProductbyCategory } from '@/types';
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaHandHoldingUsd } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { MoonLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import fetchCategoryData from '@/app/action/productlist';
import getSubCategoryData from '@/app/action/subCategory';
import Products from '@/app/products';
import Sortby from '@/app/sortProduct';
import { useParams } from 'next/navigation';

type CategoryIdPageProps = {
    id: string;
}

const ProductbyCategory = ({ id }: CategoryIdPageProps) => {
   

    // console.log(id);

    const params=useParams();
    console.log(params)
    
    const [categoryData, setCategoryData] = useState<string | null>(null);
    const [subCategoryData, setSubCategoryData] = useState<SubCategoryItem[]>([]);
    const [product, setProductData] = useState<ProductbyCategory[]>([]);
    const [categoryId, setCategoryId] = useState(params.id.toString());
    const [page, setPage] = useState("1");
    const [sortValue, setSortValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [limit, setLimit] = useState(10);
    const [totalCount, setTotalCount] = useState<number>(0);

    const { ref, inView } = useInView();



    // useEffect(() => {
    //     if (inView && !loading) {
    //         subCategory(categoryId, 'default', page);
    //     }
    // }, [inView, loading]);

  

    useEffect(() => {
        // if (params.id) {
            setCategoryId(params.id.toString());
        // }
         if (categoryId) { // Make sure params.id is truthy before setting categoryId
        // setCategoryId(categoryId);
        getCategoryData();
         }
        console.log("use");


    }, [categoryId]);

    const getCategoryData = async () => {
        try {
            console.log(`cat=${categoryId}`);

            await getProductData(categoryId);
            const data = await fetchCategoryData(categoryId);

            setCategoryData(data.name);
            setSubCategoryData(data.children);
            //await getProductData();
            //setProductData(data.Products);
        } catch (error: any) {
            console.error((error as Error).message);
        }
    };

    const getProductData = async (categoryID: String) => {
        try {
            setLoading(true);
            const { data, status } = await getSubCategoryData(categoryID, sortValue, page);
            if (status === 200) {
                setProductData(prevProducts => [...prevProducts, ...data.data]);
              const pg=  parseInt(page)+1;
                setPage(pg.toString());
                setTotalCount(data.totalCount);
                console.log(product.length.toString);


            }
            //  else {
            //     console.error('Error fetching subcategory. Status:', status);
            // }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching subcategory:', error);
        }
    };



    const handleSortChange = (selectedValue: string) => {
        setSortValue(selectedValue); // Update sort value
        setProductData([]); // Reset product state to empty
        setPage('1'); // Reset page when sorting changes
        getProductData(categoryId);
    };


    const loadMoreProducts = () => {
        if (!loading && categoryId) {
            getProductData(categoryId);
        }
    };
    useEffect(() => {
        if (inView ) {
            loadMoreProducts();
        }
    }, [inView]);

    return (
        <div className='mb-3 p-2'>
            <div>
                {categoryData && (
                    <div>
                        <div className="">
                            <img className='w-full h-44' />
                        </div>
                        {subCategoryData.length > 0 && (
                            <div className="px-3 py-1 pt-8">
                                <div className='flex flex-row justify-center gap-2'>
                                    {subCategoryData.map((subcategory, index) => (
                                        <div key={index} onClick={() => {
                                            setProductData([]); // Reset product state to empty 
                                             setPage("1");
                                            setCategoryId(subcategory.id.toString());
                                             
                                            // subCategory(subcategory.id, '', 1);// Always start from page 1 for a new subcategory
                                        }}>
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
                        <Sortby onChange={handleSortChange} totalCount={totalCount} />

                        <Products product={product} />
                        {/* {loading && <MoonLoader className='item-center' color="#36d7b7" />} */}
                        <div ref={ref}></div>

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
                                        <div className='text-5xl'><FaHandHoldingUsd /></div>
                                        <div className='flex flex-col'>
                                            <div className='font-semibold'>Free Shipping</div>
                                            <div className='text-gray-500'>Order over $100</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center pb-1 pt-2 gap-2">
                                        <div className='text-5xl'><MdSupportAgent /></div>
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
        </div>
    );
};

export default ProductbyCategory;