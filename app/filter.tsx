import React from 'react'
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { BsGridFill,BsViewList  } from "react-icons/bs";

const Filter = () => {
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
                                <div className='flex gap-12 ml-auto'>
                                    <div className="">Show <span className='bg-white p-2   text-gray-500'>16</span></div>
                                    <div>Sort by<span className='bg-white p-2  text-gray-500'>Default</span></div>
                                </div>
                            </div>
                        </div>
    </div>
  )
}

export default Filter;