// "use client"

// import './imageslider.css';

// import React from 'react';
// import Slider from 'react-slick';
// import Slide from './Slide';
// import NewCollectionSlide from './NewCollectionSlide';

// const Offer = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     pauseOnHover: false,
//   };

//   const slideData = [
//     {id: 0,
//       img: "/15problack.png",
//       title:"Offer 2024",
//       mainTitle:"New Year Sale",
//       subTitle:"10% Discount",
//   },
//   {id: 1,
//       img: "/macbook-.jpg",
//       title:"Offer 2024",
//       mainTitle:"New Year Sale",
//       subTitle:"8% Discount",
//   },
//   {id: 2,
//       img: "/15problack.png",
//       title:"Offer 2024",
//       mainTitle:"New Year Sale",
//       subTitle:"10% Discount",
//   },
//   {id: 3,
//       img: "/15problack.png",
//       title:"Offer 2024",
//       mainTitle:"New Year Sale",
//       subTitle:"10% Discount",
//   },
//   ];
 
//   const newCollectionData = [
//     { id: 1, img: "/macbook-.jpg", heading: "New Collection", mainTitle: "Apple MacBook Pro 16", buttonLabel: "Start Shopping" },
//     { id: 2, img: "/macbook-.jpg", heading: "New Collection", mainTitle: "Apple MacBook Pro 16", buttonLabel: "Start Shopping" },
//   ];

//   return (
//     <div className='container pt-6 lg:pt-0'>
//       <div className='grid grid-cols-1 md:grid-cols-3  lg:grid-cols-4'>
//       {/* flex xs:flex-col md:flex-row xl:flex-row 2xl:flex-col */}
//  <div className='flex-1 pr-8'>
//       <div className='absolute right-3  mb-4  p-3 rounded-lg'>
//       <img
//     src="/computer-laptop-macbook-night.jpg" 
//     alt="Product Image"
//     className=" ml-4 w-80 h-40 rounded-xl"
//   />
//   <div className='image__slider__container_collection'>
//         {/* New Collection Section */}
//         <div className='p-2 mb-4'>
//           <Slider {...settings}>
//             {newCollectionData.map((item) => (
//               <NewCollectionSlide
//                 key={item.id}
//                 img={item.img}
//                 mainTitle={item.mainTitle}
//                 heading={item.heading}
//                 buttonLabel={item.buttonLabel}
//               />
//             ))}
//           </Slider>
//         </div>
        
//       </div>
//      </div>
     

//      <div className='absolute w-96 right-96 m-2 bg-neutral-100 p-2 rounded-lg flex justify-center items-center'>
//   <div >
//     <h2 className='text-2xl md:text-lg lg:text-lg font-bold font-serif leading-tight'>
//       Sades <br/>Headset
//     </h2>
//     <p className="">
//       <span className='font-bold text-xs'>Weekend<br/> Discount</span> 
//       <span className='font-bold ml-4 text-lg'>$9.90 </span>
//       <span className="text-slate-500 line-through ml-2 ">$12.00</span>
//     </p>
//     <p className="hover:text-slate-500 mt-2">
//       <a href="#" className="underline">view more</a>
//     </p>
//   </div>
//   <img
//     src="/Headset.png" 
//     alt="Product Image"
//     className="ml-4 w-32 h-32 rounded-full"
//   />
// </div>
// <div className='absolute w-96  right-52 m-44 bg-neutral-100 p-2 rounded-lg flex items-center'>
//   <div>
//     <h2 className='text-xl md:text-base lg:text-lg font-bold font-serif leading-tight'>
//       Asus <br/>Zenbook
//     </h2>
//     <p className="">
//       <span className='font-bold text-xs'>Weekend<br/> Discount</span> 
//       <span className='font-bold ml-4 text-lg'>$689.90 </span>
//       <span className="text-slate-500 line-through ml-2 ">$750.00</span>
//     </p>
//     <p className="hover:text-slate-500 mt-2">
//       <a href="#" className="underline">view more</a>
//     </p>
//   </div>
//   <img
//     src="/zenbook.png" 
//     alt="Product Image"
//     className=" w-32 h-32 rounded-full"
//   />
// </div>
    
//       <div className='image__slider__container'>
//         <Slider {...settings}>
//           {slideData.map((item) => (
//             <Slide
//               key={item.id}
//               img={item.img}
//               title={item.title}
//               mainTitle={item.mainTitle}
//               subTitle={item.subTitle}
//             />
//           ))}
//         </Slider>
//       </div>
//     </div>
//     </div>
    
//     </div>
//   );
// };

// export default Offer;