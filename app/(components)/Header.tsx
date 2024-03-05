"use client"
import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { GoSearch } from 'react-icons/go';
import { BiUser } from 'react-icons/bi';
import { FiHeart } from 'react-icons/fi';
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { Popover } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import classnames from 'classnames';
import { IoSettingsSharp } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { GoListUnordered } from "react-icons/go";
import { getCookie, deleteCookie } from 'cookies-next';
import { PropagateLoader } from 'react-spinners';
import { getBadgeCount } from '../action/getbadgeCount';
import Search from '../action/search';

import MiniWishlist from '../miniwishlist/page';
import MiniCart from '../minicart/page';
import getSubCategoryData from '../action/subCategory';

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [searchName, setSearchName] = useState('');
  const [badgecount, setBadgeCount] = useState<{ cartCount: number, wishlistCount: number } | null>(null);
  const [showMiniCart, setShowMiniCart] = useState(false);
  const [showMiniWishlist, setShowMiniCWishlist] = useState(false);
 
  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLDivElement>(null); // Add reference for miniwishlist

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token || null);

    const userDetailsCookie = getCookie('userDetails');
    if (userDetailsCookie) {
      const userDetails = JSON.parse(userDetailsCookie);
      setUserName(`${userDetails.firstName} ${userDetails.lastName}`);
    }

    getbadgecount();
  }, []);


  const handleSearch = () => {
    router.push(`/searchpage?name=${searchName}`);
  };


  const toggleMiniCart = () => {
    setShowMiniCart(!showMiniCart);
  };

  const toggleMiniWishlist = () => {
    setShowMiniCWishlist(!showMiniWishlist);
  };

  const handleLogout = () => {
    const shouldLogout = window.confirm('Are you sure you want to logout?');

    if (shouldLogout) {
      localStorage.removeItem('token');
      deleteCookie('userDetails');
      deleteCookie("islogin");
      toast.success('Logged Out');
      router.push('/');
      window.location.reload();
    }
  };
  


  const getbadgecount = async () => {
    try {
      const { data, status } = await getBadgeCount();
      if (status === 200) {
        setBadgeCount(data);
        console.log(data);
        
      } else {
        console.error('Error fetching badge count. Status:', status);
      }
    } catch (error) {
      console.error('Error fetching badge count:', error);
    }
  };

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showMiniCart && !menuRef.current?.contains(event.target as Node)) {
        setShowMiniCart(false);
      }
      if (showMiniWishlist && !wishlistRef.current?.contains(event.target as Node)) {
        setShowMiniCWishlist(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
   }, [showMiniCart, showMiniWishlist]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 h-28 sm:h-20">
      <h1 className="font-bold cursor-pointer logo text-3xl font-serif text-center hidden sm:block sm:text-left mb-4 sm:mb-0">
        <Link href="/" >
          Shop
        </Link>
      </h1>

      <div className="sm:flex items-center justify-center  mx-auto relative border border-gray-400 px-4 w-96 sm:w-96 p-2 mt-3 sm:p-3 rounded-full focus-within:shadow-lg overflow-hidden">
        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 pl-4 bg-transparent"
          type="text"
          id="search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search Product.."
        />
        <button
          onClick={handleSearch}
          type="submit"
          className=" absolute  end-0 top-1/2 transform -translate-y-1/2 primary-button font-medium rounded-full p-3"
        >
          <GoSearch className="text-white text-xl"/>
        </button>
      </div>

      <div className="flex lg:ml-auto sm:gap-8 md:gap-8 gap-44 text-[30px]">
        <div className="relative cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span ref={userRef}>
            <BiUser className="mr-2 cursor-pointer" />
          </span>
          {open && (
            <div ref={menuRef} className="flex flex-col justify-center w-40 dropDownProfile gap-2 cursor-pointer absolute top-10 text-base right-0  rounded-md shadow-md p-2">
              {token ? (
                <>
                  <div onClick={() => setOpen(false)}>
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
                    <div className="flex items-center gap-2 pt-2 border-b hover:font-semibold hover:border-gray-600" onClick={handleLogout}>
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
       {!token && !badgecount && (
  <Link href="/login">
    <div>
      <div className="relative">
        <div className="hover:text-black cursor-pointer duration-200 relative group">
          <FiHeart />
        </div>
      </div>
    </div>
  </Link>
)}

{!token && !badgecount && (
  <Link href="/login">
    <div>
      <div className="relative">
        <div className="hover:text-black cursor-pointer duration-200 relative group">
          <FaShoppingCart />
        </div>
      </div>
    </div>
  </Link>
)}

{badgecount && (
  <>
    <div className="relative">
      <div 
        onClick={toggleMiniWishlist}
        className="hover:text-black cursor-pointer duration-200 relative group">
        <FiHeart />
        <div className="bg-red-600 rounded-full absolute top-0 text-white right-0 w-[18px] h-[18px] text-[12px] text-center">
          {badgecount.wishlistCount}
        </div>
        {showMiniWishlist && <div className="absolute" ref={wishlistRef}><MiniWishlist/></div>}
      </div>
    </div>
    <div className="relative">
      <div
        className="hover:text-black cursor-pointer duration-200 relative group" onClick={toggleMiniCart}>
        <FaShoppingCart  />
        <div className="bg-red-600 text-white rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-center">
          {badgecount.cartCount}
        </div>
        {showMiniCart && <div className="absolute" ref={menuRef}><MiniCart/></div>}
      </div>      
    </div>  
  </>
)}
      </div>
    </div>
  );
};

export default Header;


// import React, { useState, useEffect, useRef } from 'react';
// import { GoSearch } from 'react-icons/go';
// import { BiUser } from 'react-icons/bi';
// import { FiHeart } from 'react-icons/fi';
// import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
// import Link from 'next/link';
// import { IoSettingsSharp } from "react-icons/io5";
// import { MdLogout } from "react-icons/md";
// import { Toaster, toast } from 'sonner';
// import { useRouter } from 'next/navigation';
// import { GoListUnordered } from "react-icons/go";
// import { getCookie, deleteCookie } from 'cookies-next';
// import { getBadgeCount } from '../action/getbadgeCount';
// import MiniWishlist from '../miniwishlist/page';
// import MiniCart from '../minicart/page';
// import Search from '../action/search';

// const Header = () => {
//   const router = useRouter();
//   const [token, setToken] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [userName, setUserName] = useState<string | null>(null);
//   const [searchName, setSearchName] = useState('');
//   const [badgecount, setBadgeCount] = useState<{ cartCount: number; wishlistCount: number } | null>(null);
//   const [showMiniCart, setShowMiniCart] = useState(false);
//   const [showMiniWishlist, setShowMiniCWishlist] = useState(false);

//   const menuRef = useRef<HTMLDivElement>(null);
//   const userRef = useRef<HTMLDivElement>(null);
//   const wishlistRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setToken(token || null);

//     const userDetailsCookie = getCookie('userDetails');
//     if (userDetailsCookie) {
//       const userDetails = JSON.parse(userDetailsCookie);
//       setUserName(`${userDetails.firstName} ${userDetails.lastName}`);
//     }

//     getBadgeCount();
//   }, []);

//   const handleSearch = () => {
//         router.push(`/searchpage?name=${searchName}`);
//       };

//   const getbadgecount = async () => {
//         try {
//           const { data, status } = await getBadgeCount();
//           if (status === 200) {
//             setBadgeCount(data);
//             console.log(data);
            
//           } else {
//             console.error('Error fetching badge count. Status:', status);
//           }
//         } catch (error) {
//           console.error('Error fetching badge count:', error);
//         }
//       };

//   const handleLogout = () => {
//     const shouldLogout = window.confirm('Are you sure you want to logout?');

//     if (shouldLogout) {
//       localStorage.removeItem('token');
//       deleteCookie('userDetails');
//       deleteCookie('islogin');
//       router.push('/');
//       window.location.reload();
//     }
//   };

//   const handleLogin = () => {
//     router.push('/login');
//   };

//   const toggleMiniCart = () => {
//     if (!token) {
//       handleLogin();
//     } else {
//       setShowMiniCart(!showMiniCart);
//     }
//   };

//   const toggleMiniWishlist = () => {
//     if (!token) {
//       handleLogin();
//     } else {
//       setShowMiniCWishlist(!showMiniWishlist);
//     }
//   };

//   const handleMouseEnter = () => {
//     if (!token) {
//       handleLogin();
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (showMiniCart && !menuRef.current?.contains(event.target as Node)) {
//         setShowMiniCart(false);
//       }
//       if (showMiniWishlist && !wishlistRef.current?.contains(event.target as Node)) {
//         setShowMiniCWishlist(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showMiniCart, showMiniWishlist]);

//   return (
//     <div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 lg:px-16 h-28 sm:h-20">
//       <h1 className="font-bold cursor-pointer logo text-3xl font-serif text-center hidden sm:block sm:text-left mb-4 sm:mb-0">
//         <Link href="/">Shop</Link>
//       </h1>

//       <div className="sm:flex items-center justify-center mx-auto relative border border-gray-400 px-4 w-96 sm:w-96 p-2 mt-3 sm:p-3 rounded-full focus-within:shadow-lg overflow-hidden">
//       <input
//           className="peer h-full w-full outline-none text-sm text-gray-700 pl-4 bg-transparent"
//           type="text"
//           id="search"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           placeholder="Search Product.."
//         />
//         <button
//           onClick={handleSearch}
//           type="submit"
//           className=" absolute  end-0 top-1/2 transform -translate-y-1/2 primary-button font-medium rounded-full p-3"
//         >
//           <GoSearch className="text-white text-xl"/>
//         </button>
//       </div>

//       <div className="flex lg:ml-auto sm:gap-8 md:gap-8 gap-44 text-[30px]">
//         <div className="relative cursor-pointer" onMouseEnter={handleMouseEnter}>
//           <span ref={userRef}>
//             <BiUser className="mr-2 cursor-pointer" />
//           </span>
//           {open && (
//             <div ref={menuRef} className="flex flex-col justify-center w-40 dropDownProfile gap-2 cursor-pointer absolute top-10 text-base right-0  rounded-md shadow-md p-2">
//               {token ? (
//                 <>
//                   <div onClick={() => setOpen(false)}>
//                     <div className='font-semibold text-center'>{userName}</div>
//                     <div className="flex items-center pb-1 pt-3 border-b gap-2 hover:font-semibold hover:border-gray-600">
//                       <div><FaUserCircle /></div>
//                       <Link href="/profile">Profile</Link>
//                     </div>
//                     <div className="flex items-center pt-2 pb-1 gap-2 border-b hover:font-semibold hover:border-gray-600">
//                       <div><IoSettingsSharp /></div>
//                       <Link href="/settings">Settings</Link>
//                     </div>
//                     <div className="flex items-center pb-1 pt-2 gap-2 border-b hover:font-semibold hover:border-gray-600">
//                       <div><GoListUnordered /></div>
//                       <Link href="/myorders">My Orders</Link>
//                     </div>
//                     <div className="flex items-center gap-2 pt-2 border-b hover:font-semibold hover:border-gray-600" onClick={handleLogout}>
//                       <div><MdLogout /></div>
//                       <Link href="/logout">Logout</Link>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <Link href="/login">Login</Link>
//               )}
//             </div>
//           )}
//           <div />
//         </div>
//         {badgecount && (
//           <>
//             <div className="relative">
//               <div onClick={toggleMiniWishlist} className="hover:text-black cursor-pointer duration-200 relative group">
//                 <FiHeart />
//                 <div className="bg-red-600 rounded-full absolute top-0 text-white right-0 w-[18px] h-[18px] text-[12px] text-center">
//                   {badgecount.wishlistCount}
//                 </div>
//               </div>
//               {showMiniWishlist && <div className="absolute" ref={wishlistRef}><MiniWishlist /></div>}
//             </div>
//             <div className="relative">
//               <div onClick={toggleMiniCart} className="hover:text-black cursor-pointer duration-200 relative group">
//                 <FaShoppingCart />
//                 <div className="bg-red-600 text-white rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-center">
//                   {badgecount.cartCount}
//                 </div>
//               </div>
//               {showMiniCart && <div className="absolute" ref={wishlistRef}><MiniCart /></div>}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

