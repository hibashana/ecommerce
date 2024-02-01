"use client"
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GoSearch } from 'react-icons/go';
import { BiUser } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import classnames from 'classnames';
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GoListUnordered } from "react-icons/go";
import { getCookie,deleteCookie } from 'cookies-next';
import { listeners } from 'process';
// import { parseCookies } from 'cookies-next';

const Header = () => {
  // const currentPath = usePathname();
  // console.log(currentPath);

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);  
 

  const menuRef=useRef<HTMLDivElement>(null);
  const userRef=useRef<HTMLDivElement>(null);

  // window.addEventListener('click',(e)=>{
  //   console.log(e.target === menuRef.current)
  // });

  // window.addEventListener('click',(e)=>{
  //   if(e.target !== menuRef.current && e.target !== userRef.current ){
  //     setOpen(false);
  //   }
  // });

  const router=useRouter();

  // const Menu=["Profile","Settings","Logout"];

 useEffect(() => {
    // Check if token is present, set token state
    const token = localStorage.getItem('token');
    console.log(token);
    setToken(token || null);

    // // Check if user details are present in cookies
    // const userDetailsCookie = getCookie('userDetails');
    // if (userDetailsCookie) {
    //   const userDetails = JSON.parse(userDetailsCookie);
    //   setUserName(`${userDetails.firstName} ${userDetails.lastName}`);
    //   console.log(`${userDetails.firstName} ${userDetails.lastName}`);
    // }

    const userDetailsCookie = getCookie('userDetails');
    if (userDetailsCookie) {
      const userDetails = JSON.parse(userDetailsCookie);
      // Now, you can use userDetails.firstName and userDetails.lastName as needed
      console.log(`${userDetails.firstName} ${userDetails.lastName}`);
      setUserName(`${userDetails.firstName} ${userDetails.lastName}`);
    }
    
  }, []);

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to logout?');

    if (shouldLogout) {
      localStorage.removeItem('token');
      deleteCookie('userDetails'); 
      // deleteCookie("islogin");
      toast.success('Logged Out');
      console.log("Logged Out");
         
      router.push('/');
      window.location.reload();
    }
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

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

      <div className="flex lg:ml-auto sm:gap-8 md:gap-8 gap-44 text-[30px]">
     
        <div className="relative cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span ref={userRef}>
            <BiUser className="mr-2 cursor-pointer" />
          </span>
            
            {/* <span onClick={() => setOpen(!open)} ref={userRef} ><BiUser className="mr-2" cursor-pointer/></span> */}
          {open && (
              //  <div className="flex flex-col justify-center w-32 dropDownProfile gap-2 cursor-pointer  absolute top-10 text-base right-0 bg-slate-500 rounded-md shadow-md p-2">
              //     <ul>
              //       { Menu.map((menu)=>
              //       <li className="flex items-center pb-1 pt-2 border-b gap-2 hover:border-gray-600" key={menu}>{menu}</li>
              //       )}
              //     </ul>
              //  </div>
            <div ref={menuRef} className="flex flex-col justify-center w-40 dropDownProfile gap-2 cursor-pointer  absolute top-10 text-base right-0  rounded-md shadow-md p-2">
              {token ? (
                <>
                <div onClick={() => setOpen(false)}>
                 {/* <div   className="flex items-center pb-1 pt-2 gap-2 hover:font-semibold hover:border-gray-600">
                 
                  </div> */}
                  <div className='font-semibold text-center'>{userName}</div>
                  <div className="flex items-center pb-1 pt-3 border-b gap-2 hover:font-semibold hover:border-gray-600">
                     <div><FaUserCircle /></div>
                     <Link href="/profile">Profile</Link>
                  </div>
                  <div className="flex items-center pt-2 pb-1 gap-2 border-b hover:font-semibold hover:border-gray-600">
                     <div><IoSettingsSharp /></div>
                     <Link href="/settings">Settings</Link>
                  </div>
                  <div className="flex items-center pb-1 pt-2 gap-2 border-b hover:font-semibold hover:border-gray-600">
                     <div><GoListUnordered /></div>
                     <Link href="/myorders">My Orders</Link>
                  </div>
                  <div className="flex items-center gap-2 pt-2  border-b hover:font-semibold hover:border-gray-600" 
                    onClick={handleLogout}>
                      <div><MdLogout /></div>
                      <Link href="/logout">Logout</Link>  
                  </div>
                  </div>
                </>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </div>
          )}
          <div />
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
        <Link href={"/addtoCart"} className='hover:text-black cursor-pointer duration-200 relative group'> 
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

export default Header;


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

// export default Header;
