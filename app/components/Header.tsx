"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { GoSearch } from 'react-icons/go';
import { BiUser } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import classnames from 'classnames';

const Header = () => {
  // const currentPath = usePathname();
  // console.log(currentPath);

  // const links = [
  //   { label: 'Home', href: '/home' },
  //   { label: 'About', href: '/about' },
  //   { label: 'Collection', href: '/collection' },
  //   { label: 'Download', href: '/download' },
  // ];
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 h-28 sm:h-20">
      <h1 className="font-bold logo text-3xl font-serif text-center hidden sm:block sm:text-left mb-4 sm:mb-0">
        Shop
      </h1>

      <div className="sm:flex items-center justify-center  mx-auto relative border border-gray-400 px-4 w-96 sm:w-96 p-2 mt-3 sm:p-3 rounded-full focus-within:shadow-lg overflow-hidden">
        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pl-4 bg-transparent"
          type="text"
          id="search"
          placeholder="Search Product.."
        />
        <button
          type="submit"
          className=" absolute end-0 top-1/2 transform -translate-y-1/2 primary-button font-medium rounded-full p-3"
        >
          <GoSearch className="text-white text-xl" />
        </button>
      </div>

      <div className="flex lg:ml-auto sm:gap-8 md:gap-8 gap-36 text-[30px]">
        <div className="relative">
          <Link href={"/login"}><BiUser /></Link>
        </div>
        <div className="relative">
          <Link href={"/wishlist"} className='hover:text-black cursor-pointer duration-200 relative group'> 
          <FiHeart />
          <div className="bg-red-600 rounded-full absolute top-0 text-white  right-0 w-[18px] h-[18px] text-[12px] text-center">
            0
          </div>
          </Link>
        </div>
        <div className="relative">
        <Link href={"/"} className='hover:text-black cursor-pointer duration-200 relative group'> 
          <FaShoppingCart />
          <div className="bg-red-600 text-white rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-center">
            0
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};



//   return (
    
//       <Popover className="flex items-center justify-between px-6 h-20">
//         <h1 className="font-bold text-3xl font-serif">Shop</h1>

//         <div className=" sm:flex items-center justify-center mx-auto relative border border-gray-400 px-4 w-96 p-3 rounded-full focus-within:shadow-lg overflow-hidden">
//   <input
//     className="peer h-full w-full outline-none text-sm text-gray-700 pl-8"
//     type="text"
//     id="search"
//     placeholder="Search Product.."
//   />
//   <button
//     type="submit"
//     className="text-white absolute end-0 top-1/2 transform -translate-y-1/2 bg-slate-700 font-medium rounded-full p-3"
//   >
//     <GoSearch className="text-white text-xl"/>
//   </button>
// </div>
// <div className='hidden lg:flex  gap-4  text-[30px]'> 
//  <BiUser/>

//  <div className='relative'>
//   <FiHeart/>
//   <div className='bg-red-600 rounded-full absolute top-0  right-0 w-[18px] h-[18px] text-[12px] text-center'>0</div>
//  </div>

// <div className='relative'>
//   <FaShoppingCart />
//   <div className='bg-red-600 rounded-full absolute top-0  right-0 w-[18px] h-[18px] text-[12px] text-center'>0</div>
//  </div>
// </div>




        {/* <div className="">
          <ul className="hidden sm:flex items-end justify-end gap-2 md:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={classnames({
                    'text-zinc-900': link.href === currentPath,
                    'text-Black': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true,
                    'hover:font-bold hover:text-black': true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
             <li>
             <Link href="/login" className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              Login
            </Link>
          </li>
          </ul>
        </div> */}

        // <div className="flex grow items-center justify-end sm:hidden">
        //   <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-indigo-500">
        //     <span className="sr-only">Open menu</span>
        //     <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        //   </Popover.Button>
        // </div>

        // <Popover.Panel
        //   focus
        //   className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        // >
        //   <div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
        //     <div className="px-5 pt-5 pb-6">
        //       <div className="flex items-center justify-between">
        //         <h1 className="font-bold text-3xl font-serif">Shop</h1>
        //         <div className="-mr-2">
        //           <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-indigo-500">
        //             <span className="sr-only">Close menu</span>
        //             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        //           </Popover.Button>
        //         </div>
        //       </div>
        //       <div className="mt-6">
        //         <nav className="grid gap-y-8">
                  
                  {/* {links.map((link) => (
                    <Link
                      key={link.href}
                      className="focus:outline-none focus:ring focus:ring-inset focus:ring-gray-500 px-2"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))} */}
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </Popover.Panel>
//       </Popover>
//   );
// };

export default Header;
