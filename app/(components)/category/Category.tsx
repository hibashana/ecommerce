"use client"

import React, { useState, useEffect } from "react";
import { baseURL, imageURL } from '@/utils/constants';
import { CategoryItem, SubCategoryItem } from "@/types";
import { useRouter } from 'next/navigation';

const Category = () => {
  const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
  const [subCategoryData, setSubCategoryData] = useState<SubCategoryItem[]>([]);
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await fetch(`${baseURL}/category?parentId=1`, { cache: 'no-store' });
      const data = await response.json();
      setCategoryData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSubCategory = async (parentId: number) => {
    try {
      const response = await fetch(`${baseURL}/category?parentId=${parentId}`, { cache: 'no-store' });
      const data = await response.json();
      setSubCategoryData(data.data);
      setCurrentParentId(parentId);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryHover = (parentId: number) => {
    getSubCategory(parentId);
  };

  const handleSubCategoryLeave = () => {
    setSubCategoryData([]);
    setCurrentParentId(null);
  };

  const handleOnClick = (parentId: number) => {
    router.push(`/productByCategory/${parentId}`);
  };

  return (
    <div className="relative">
      <div className="flex items-center flex-row justify-around pb-4 pt-1">
        <div id="slider" className="flex flex-row gap-4 p-1 relative">
          {categoryData.map((category, index) => (
            <div key={index}>
              <div
                key={index}
                className="flex gap-2 px-4 p-3 w-auto justify-center text-sm rounded-xl cursor-pointer category_style:hover category_style"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleSubCategoryLeave}
                onClick={() => handleOnClick(category.id)}
              >
                <img
                  src={`${imageURL}${category.imageUrl}`}
                  className="w-7 h-7 object-cover"
                />
                <p>{category.name}</p>
              </div>
            </div>
          ))}
        </div>
        {subCategoryData.length > 0 && (
          <div className="absolute top-14 left-0 w-full bg-white p-2 shadow-lg z-10">
            <div className="mx-auto max-w-screen-xl px-2 py-1 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
              <ul className="">
                {subCategoryData.map((subCategory, subIndex) => (
                  <li key={subIndex}>
                    <div className="cursor-pointer py-1 px-3 hover:text-gray-900 hover:underline text-base">
                      {subCategory.name} 
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

    
//     <div className="flex  items-center justify-around pb-4 pt-1 ">
//       <div className='flex  gap-2 p-2 w-28 justify-center rounded-xl cursor-pointer category_style:hover category_style'>
//         < MdLaptopChromebook  size={20} />
//         <p>Laptop</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
//         <ImMobile size={20} />
//         <p>Phone</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center rounded-xl cursor-pointer  category_style:hover category_style  '>
//         < MdTabletMac size={20} />
//         <p>Tablets</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
//         <IoHeadsetSharp size={20} />
//         <p>Headsets</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
//         <HiMiniComputerDesktop  size={20} />
//         <p>Tv</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style '>
//         <IoWatchOutline size={20} />
//         <p>Watches</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
//         <FaPlug  size={20} />
//         <p>Charger</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer  category_style:hover category_style '>
//         <MdOutlineMouse size={20} />
//         <p>Mouse</p>
//       </div>

//       <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer  category_style:hover category_style '>
//         < FaRegKeyboard size={20} />
//         <p>Keyboard</p>
//       </div>

//       <div className='flex  gap-2 p-2  w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
//         <p>More&nbsp;Products</p>
//       </div>
//     </div>
//   );
// };
// }
// export default Category;
