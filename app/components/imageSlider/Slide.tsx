import React from 'react';
import { CiShop } from "react-icons/ci";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlideProps {
  img: string;
  title: string;
  mainTitle: string;
  subTitle: string;
}

const Slide: React.FC<SlideProps> = ({ img, title, mainTitle, subTitle }) => {
  return (
    <div className='relative'>
      <img
        className='p-1 w-auto  md:h-96 rounded-xl object-cover  mb-4 '
        // style={{ minWidth: '400px', minHeight: '300px' }}
        src={img}
        alt='Product Image'
      />
      <div className='absolute left-0 top-0 right-0 flex flex-col justify-end p-4'>
        <h2 className='text-white text-2xl md:text-3xl lg:text-3xl font-bold font-serif leading-tight'>{mainTitle}</h2>
        <h3 className='text-white text-xl lg:text-xl'>{title}</h3>
        <h3 className='mt-4 text-white text-xl lg:text-xl'>{subTitle}</h3>
        <div className='mt-12 bg-white p-1 w-28 text-xs cursor-pointer hover:bg-slate-100'>
          <CiShop className='inline-block mr-2'/>
          Start shopping
        </div>
      </div>
    </div>
  );
};

export default Slide;
