"use client";

import './imageslider.css';

import React from 'react';
import Slider from 'react-slick';
import Slide from './Slide';
import NewCollectionSlide from './NewCollectionSlide';

const Offers = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
  };

  const slideData = [
    {
      id: 1,
      img: "/15problack.png",
      title: "Offer 2024",
      mainTitle: "New Year Sale",
      subTitle: "10% Discount",
    },
    {
      id: 2,
      img: "/macbook-.jpg",
      title: "Offer 2024",
      mainTitle: "New Year Sale",
      subTitle: "8% Discount",
    },
    {
      id: 3,
      img: "/15problack.png",
      title: "Offer 2024",
      mainTitle: "New Year Sale",
      subTitle: "10% Discount",
    },
    {
      id: 4,
      img: "/15problack.png",
      title: "Offer 2024",
      mainTitle: "New Year Sale",
      subTitle: "10% Discount",
    },
  ];

  const newCollectionData = [
    { id: 1, img: "/macbook-.jpg", heading: "New Collection", mainTitle: "Apple MacBook Pro 16", buttonLabel: "Start Shopping" },
    { id: 2, img: "/macbook-.jpg", heading: "New Collection", mainTitle: "Apple MacBook Pro 16", buttonLabel: "Start Shopping" },
  ];

  // return (
  //   <div className='flex'>
  //     {/* <div className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4'> */}
  //         {/* flex xs:flex-col md:flex-row xl:flex-row 2xl:flex-col */}
  //     {/* Slide Component */}
  //     <div className='col-span-1 lg: image__slider__container'>
  //       <Slider {...settings}>
  //         {slideData.map((item) => (
  //           <Slide
  //             key={item.id}
  //             img={item.img}
  //             title={item.title}
  //             mainTitle={item.mainTitle}
  //             subTitle={item.subTitle}
  //           />
  //         ))}
  //       </Slider>
  //     </div>
    

      {/* Second Column */}
      {/* <div className='ml-2 mx-8 w-4/5 '> */}
        {/* First container */}
        {/* <div className='bg-neutral-100 h-48 rounded-xl flex justify-center items-center'>
          <div>
            <h2 className='text-2xl md:text-lg lg:text-lg font-bold font-serif leading-tight'>
              Sades <br />Headset
            </h2>
            <p className=''>
              <span className='font-bold text-xs'>Weekend<br /> Discount</span>
              <span className='font-bold ml-4 text-lg'>$9.90 </span>
              <span className='text-slate-500 line-through ml-2 text-sm'>$12.00</span>
            </p>
            <p className='hover:text-slate-500 mt-2'>
              <a href='#' className='underline'>
                view more
              </a>
            </p>
          </div>
          <img src='/Headset.png' alt='Product Image' className='ml-8 w-32 h-32 rounded-full' />
        </div> */}

        {/* Second container */}
        {/* <div className='bg-neutral-100 rounded-xl h-44 flex justify-center items-center mt-4'>
          <div>
            <h2 className='text-2xl md:text-lg lg:text-lg font-bold font-serif leading-tight'>
              Asus <br />Zenbook
            </h2>
            <p className=''>
              <span className='font-bold text-xs'>Weekend<br /> Discount</span>
              <span className='font-bold ml-4 text-lg'>$689.90 </span>
              <span className='text-slate-500 line-through ml-2 text-sm'>$750.00</span>
            </p>
            <p className='hover:text-slate-500 mt-2'>
              <a href='#' className='underline'>
                view more
              </a>
            </p>
          </div>
          <img src='/zenbook.png' alt='Product Image' className='ml-8 w-32 h-32 rounded-full' />
        </div> */}
      {/* </div> */}

      {/* Third Column */}
      {/* <div className='col-span-3 pb-5 '>
        <img
          src="/computer-laptop-macbook-night.jpg"
          alt="Product Image"
          className="hidden sm:block w-80 h-48 rounded-xl"
        />
        <div className='image__slider__container_collection my-4 '>
          <Slider {...settings}>
            {newCollectionData.map((item) => (
              <NewCollectionSlide
                key={item.id} 
                img={item.img}
                mainTitle={item.mainTitle}
                heading={item.heading}
                buttonLabel={item.buttonLabel}
              />
            ))}
          </Slider>
          </div>
        
      </div> */}
    {/* </div>
  );
}; */}


return (
  <div className='flex'>
    {/* <div className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4'> */}
        {/* flex xs:flex-col md:flex-row xl:flex-row 2xl:flex-col */}
    {/* Slide Component */}
    <div className='w-full h-1/5'>
      <Slider {...settings}>
        {slideData.map((item) => (
          <Slide
            key={item.id}
            img={item.img}
            title={item.title}
            mainTitle={item.mainTitle}
            subTitle={item.subTitle}
          />
        ))}
      </Slider>
    </div>
    </div>
);
};
export default Offers;