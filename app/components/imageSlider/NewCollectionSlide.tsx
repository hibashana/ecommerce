// NewCollectionSlide.tsx
import React from 'react';
import { CiShop } from "react-icons/ci";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface NewCollectionSlideProps {
  img: string;
  mainTitle: string;
  heading: string;
  buttonLabel: string;
}

const NewCollectionSlide: React.FC<NewCollectionSlideProps> = ({ img, mainTitle, heading, buttonLabel }) => {
  return (
    <div className='relative '>  
    
    <div className='bg-neutral-100 w-80 h-44  rounded-xl flex flex-col justify-center items-center'>
        <h3 className='text-sm lg:text-sm'>{heading}</h3>
        <h2 className='text-xl p-1 md:text-xl lg:text-xl font-bold font-serif leading-tight'>{mainTitle}</h2> 
        <button className='justify-centermt-4 bg-black text-white  text-xs cursor-pointer hover:bg-slate-800 rounded-md p-2 flex items-center'>
          <CiShop className='inline-block mr-2' />
          {buttonLabel}
        </button>
      </div>

      {/* <img
        className='bg-neutral-100 w-80  absolute my-40 right-4 md:right-4 p-4 rounded-lg'
        src={img}
        
      /> */}
    </div>
  );
};

export default NewCollectionSlide;
