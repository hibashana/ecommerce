import React from 'react';
import { FaPlug  } from 'react-icons/fa';
import { MdLaptopChromebook, MdTabletMac,MdOutlineMouse } from "react-icons/md";
import { ImMobile } from "react-icons/im";
import { IoHeadsetSharp ,IoWatchOutline} from "react-icons/io5";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { FaRegKeyboard } from "react-icons/fa6";

const Category = () => {
  return (
    <div className="flex  items-center justify-around pb-4 pt-1 ">
      <div className='flex  gap-2 p-2 w-28 justify-center rounded-xl cursor-pointer category_style:hover category_style'>
        < MdLaptopChromebook  size={20} />
        <p>Laptop</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
        <ImMobile size={20} />
        <p>Phone</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center rounded-xl cursor-pointer  category_style:hover category_style  '>
        < MdTabletMac size={20} />
        <p>Tablets</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
        <IoHeadsetSharp size={20} />
        <p>Headsets</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
        <HiMiniComputerDesktop  size={20} />
        <p>Tv</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style '>
        <IoWatchOutline size={20} />
        <p>Watches</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
        <FaPlug  size={20} />
        <p>Charger</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer  category_style:hover category_style '>
        <MdOutlineMouse size={20} />
        <p>Mouse</p>
      </div>

      <div className='flex  gap-2 p-2 w-28 justify-center  rounded-xl cursor-pointer  category_style:hover category_style '>
        < FaRegKeyboard size={20} />
        <p>Keyboard</p>
      </div>

      <div className='flex  gap-2 p-2  w-28 justify-center  rounded-xl cursor-pointer category_style:hover category_style  '>
        <p>More&nbsp;Products</p>
      </div>
    </div>
  );
};

export default Category;
