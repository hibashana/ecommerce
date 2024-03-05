"use client"

import React, { useState, useEffect } from "react";
import { baseURL, imageURL } from '@/utils/constants';
import { CategoryItem, SubCategoryItem } from "@/types";
import { useRouter } from 'next/navigation';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const DropCategory = () => {
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

//   return (
//     <div className="relative">
//       <div className="flex items-center flex-row justify-around pb-4 pt-1">
//         <div id="slider" className="flex flex-row gap-x-3 p-1 relative">
//           {categoryData.map((category, index) => (
//             <div key={index}>
//               <div className="flex justify-center ">
//               <div
//                 key={index}
//                 className="flex  py-4 w-16 justify-center text-sm  cursor-pointer rounded-full category_style:hover category_style"  
//                 onClick={() => handleOnClick(category.id)}
//               >
//                 <img
//                   src={`${imageURL}${category.imageUrl}`}
//                   className="w-7 h-7 object-cover"
//                 />
               
//               </div>
//               </div>
//               {/* <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown hover <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
// </svg>
// </button>


// <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
//     <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
//       <li>
//         <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</div>
//       </li>
//       <li>
//         <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</div>
//       </li>
//       <li>
//         <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</div>
//       </li>
//       <li>
//         <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</div>
//       </li>
//     </ul>
// </div> */}
             
//              <div className="flex flex-row  justify-center first-letter py-3 gap-1"> 
//                 <p className="text-center text-sm">{category.name}</p>
//                 <div className="flex justify-center items-center rounded-full w-6  hover:bg-gray-200 cursor-pointer"
//                  onMouseEnter={() =>handleCategoryHover(category.id)}
//                  onMouseLeave={handleSubCategoryLeave}>
//                   <IoIosArrowDown/>
//                 </div>
//                 {/* <IoIosArrowDropdownCircle className="text-gray-500 text-3xl"/> */}
//              </div>
//           </div>
//           ))}
//         </div>
//         {subCategoryData.length > 0 && (
//           <div className="absolute left-28  top-24  bg-white p-2 shadow-lg z-10">
//             <div className="mx-auto max-w-screen-xl px-2 py-1 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
//               <ul className="">
//                 {subCategoryData.map((subCategory, subIndex) => (
//                   <li key={subIndex}>
//                     <div className="cursor-pointer py-1 px-3 hover:text-gray-900 hover:underline text-base">
//                       {subCategory.name} 
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

return (
  <div className="relative">
    <div className="flex items-center flex-row justify-around pb-4 pt-1">
      <div id="slider" className="flex flex-row gap-x-3 p-1 relative">
        {categoryData.map((category, index) => (
          <div key={index}>
            <div className="flex justify-center">
              <div
                key={index}
                className="flex py-4 w-16 justify-center text-sm cursor-pointer rounded-full category_style:hover category_style"  
                onClick={() => handleOnClick(category.id)}
              >
                <img
                  src={`${imageURL}${category.imageUrl}`}
                  className="w-7 h-7 object-cover"
                />
              </div>
            </div>
            <div className="flex flex-row justify-center first-letter py-3 gap-1 relative">
              <p className="text-center text-sm">{category.name}</p>
              <div 
                className="flex justify-center items-center rounded-full w-6 hover:bg-gray-200 cursor-pointer"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={handleSubCategoryLeave}
              >
                <IoIosArrowDown/>
                {currentParentId === category.id && (
                  <div className="absolute bg-white top-7 p-2 shadow-lg z-10">
                    <div className="mx-auto max-w-screen-xl px-2 py-1 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
                      <ul className="">
                        {subCategoryData
                          .filter(subCategory => subCategory.parentId === category.id)
                          .map((subCategory, subIndex) => (
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
          </div>
        ))}
      </div>
    </div>
  </div>
);
                          };

export default DropCategory;

