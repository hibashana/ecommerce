// import React, { useState ,useRef,useEffect} from 'react';
// import { HiAdjustmentsHorizontal } from "react-icons/hi2";
// import { BsGridFill,BsViewList  } from "react-icons/bs";
// import { Product ,ProductbyCategory} from "@/types";
// import { SortBy } from './action/sortby';

// const Filter = () => {
//   const [products, setProducts] = useState<ProductbyCategory[]>([]);
//   const [selectedFilter, setSelectedFilter] = useState("all");

//   const sortby = async () => {
//     // try {
//     //   const { data, status } = await sortby();
//     //   if (status === 200) {
//     //     setProducts(data.data);
//     //   } else {
//     //     console.error('Error fetching cart data. Status:', status);
//     //   }
//     // } catch (error) {
//     //   console.error('Error fetching cart data:', error);
//     // }
//   };


//   const applyFilter = () => {
//     sortby();
//   };


//   return (
//     <div>
//       <div className='mt-5 w-full h-20 px-28 ' style={{ backgroundColor: '#F9F1E7' }}>
//                             <div className='flex flex-row gap-8  p-5 items-center'>
//                                 <div className="flex items-center pb-1 pt-2 gap-2  hover:font-semibold">
//                                     <div><HiAdjustmentsHorizontal /></div>
//                                     <div>Filter</div>
//                                 </div>
//                                 <div><BsGridFill /></div>
//                                 <div><BsViewList /></div>
//                                 <div className='text-sm font-medium border-l-2 h-12 border-gray-300 pl-6 py-4'>Showing 1-16 of 32 results</div>
//                                    {/* pagination */}
//                                 <div className='flex gap-12 ml-auto px-1 cursor-pointer'>
//                                     <div className="cursor-pointer">Show <span className='bg-white p-2 text-gray-500'>16</span></div>
//                                     <div className='flex px-2 cursor-pointer'
//                                     onClick={applyFilter}>Sort by<span className='bg-white p-2  text-gray-500'>Default</span></div>
//                                     <div className="flex items-center ">
//     <select
//       value={selectedFilter}
//       onChange={(e) => setSelectedFilter(e.target.value)}
//       className="p-2 border rounded-md"
//     >
//       <option value="default">Default</option>
//       <option value="byname">Name</option>
//       <option value="price">Price</option>
//       <option value="stockQuantity">stockQuantity</option>
//       <option value="offerPricee">offerPricee</option>
//       <option value="offerPercentage">offerPercentage</option>

//     </select>
//             </div>
//          </div>
//       </div>
//    </div>
//  </div>
//   )
// }

// export default Filter;

import React, { useState, useEffect } from 'react';
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { BsGridFill, BsViewList } from "react-icons/bs";
import { Product, ProductbyCategory } from "@/types";
import { sortBy } from './action/sortby';

const Sortby = () => {
  const [products, setProducts] = useState<ProductbyCategory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("default");

  const sort = async () => {
  //  try {
  //     const { data, status } = await sortBy(categoryId,selectedFilter);
  //     if (status === 200) {
  //       setProducts(data.data);
  //     } else {
  //       console.error('Error fetching cart data. Status:', status);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cart data:', error);
  //   }
  };

  // useEffect(() => {
  //   sort(categoryId);
  // }, [selectedFilter]);

  // const applyFilter = () => {
  //   sort(categoryId);
  // };

  return (
    <div>
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
          <div className='flex gap-12 ml-auto px-1 cursor-pointer'>
            <div className="cursor-pointer py-1">Show <span className='bg-white p-2 text-gray-500'>16</span></div>
           
            <div className='flex px-2 cursor-pointer ' ><span className='hover:text-slate-500  p-1'>Sort by</span>
            {/* onClick={applyFilter()} */}
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="default">Default</option>
                <option value="byname">Name</option>
                <option value="price">Price</option>
                <option value="stockQuantity">Stock Quantity</option>
                <option value="offerPrice">Offer Price</option>
                <option value="offerPercentage">Offer Percentage</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sortby;
