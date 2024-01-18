"use client"
// import { IoCartOutline, IoCartSharp } from "react-icons/io5";
// import { IoMdHeartEmpty } from "react-icons/io";
// import React, { useState } from "react";

import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Phone {
  id: number;
  name: string;
  offer_price: number;
  actual_price: number;
  image: string;
  offer: string;
}

interface PhoneCarouselProps {
  phones: Phone[];
}

const PhoneCarousel: React.FC<PhoneCarouselProps> = ({ phones }) => {
  const [cartStates, setCartStates] = useState<boolean[]>(Array(phones.length).fill(false));

  const handleCartClick = (index: number) => {
    setCartStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: false,
  };

  return (
    <div className="flex justify-center ">
      <div className="w-auto overflow-hidden">
        <Slider {...settings}>
          {phones.map((phone, index) => (
            <div key={index} className="w-full pr-5 pb-7">
              <div className="product_style relative shadow-lg rounded-md">
                <p className="absolute rounded-r-full p-1 text-xs top-2 offer_style offer_style:hover ">
                  -{phone.offer}%
                </p>
                <div className="p-4">
                  <div className="absolute right-2 top-2 cursor-pointer">
                    <IoMdHeartEmpty />
                  </div>
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="mx-auto w-28 h-36 lg:object-cover object-cover justify-center mb-2 rounded-md group-hover:scale-105 duration-300"
                  />

                  <hr />
                  <h2 className="pt-2 text-sm font-medium">{phone.name}</h2>
                  <div className="flex flex-row gap-3">
                    <p className="font-bold">${phone.offer_price}</p>
                    <p className="text-slate-500 line-through">
                      ${phone.actual_price.toFixed(2)}
                    </p>
                    <div
                      className=" absolute right-3 cursor-pointer"
                      onClick={() => handleCartClick(index)}
                    >
                      {cartStates[index] ? <IoCartSharp /> : <IoCartOutline />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <style>{`
          .slick-dots {
            position: absolute;
            bottom: 0px;
            list-style: none;
            display: flex;
            justify-content: center;
            padding: 0;
          } 
        `}</style>
      </div>
    </div>
  );
};

export default PhoneCarousel;
