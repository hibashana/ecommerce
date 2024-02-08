"use client"

import React, { useState, useEffect } from "react";
import { baseURL, imageURL } from '@/utils/constants';
import { CategoryItem,SubCategoryItem } from "@/types";
import { useRouter } from 'next/navigation';

// interface CategoryItem {
//   id: number;
//   imageUrl: string;
//   name: string;
// }

// interface SubCategoryItem {
//   id: number;
//   imageUrl: string;
//   parentId: number;
//   name: string;
// }

const Category = () => {
  const [categoryData, setCategoryData] = useState<CategoryItem[]>([]);
  const [subCategoryData, setSubCategoryData] = useState<SubCategoryItem[]>([]);
  const router=useRouter();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    try {
      const response = await fetch(`${baseURL}/category?parentId=1`, { cache: 'no-store' });
      const data = await response.json();
      console.log(response);
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
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleCategoryHover = (parentId: number) => {
    getSubCategory(parentId);
  };

  const handleCategoryLeave = () => {
    setSubCategoryData([]);
  };

  const handleonclick = (parentId: number) => {
    router.push(`/productByCategory/${parentId}`);
  };


  return (
    <div className="flex items-center flex-row justify-around pb-4 pt-1">
      <div id="slider" className="flex flex-row  gap-4 p-1 ">
      {/* w-full whitespace-nowrap scroll-smooth hover:overflow-x-scroll scroll */}
        {categoryData.map((category, index) => (
           <div key={index} >
          <div
            key={index}
            className="flex gap-2 px-4 p-3 w-auto justify-center text-sm rounded-xl cursor-pointer category_style:hover category_style"
            onMouseOver={() => handleCategoryHover(category.id)}
            onMouseLeave={handleCategoryLeave}
            onClick={() => handleonclick(category.id)}
          >
            <img
              src={`${imageURL}${category.imageUrl}`}
              className="w-7 h-7 object-cover"
            />
            <p>{category.name}</p>
            
          </div>
          <div className="">
            {subCategoryData.length > 0 && category.id === subCategoryData[0].parentId && (
              <ul className="boder border-2 p-2 rounded-xl cursor-pointer ">
                {subCategoryData.map((subCategory, subIndex) => (
                <li className="hover:text-slate-500 hover:underline" key={subIndex}>{subCategory.name}</li>
                ))}
              </ul>
            )}
            </div>
      </div>
        ))}
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
