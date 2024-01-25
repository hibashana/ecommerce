// // "use client"
// // import React, { useEffect, useState } from "react";
// // import { imageURL,baseURL } from "@/utils/constants";

// // interface Cart {
// //   id: number;
// //   name: string;
// //   description: string;
// //   quantity:number;
// //   price: number;
// //   imageUrl: string;
// // }

// // interface CartProps {}


// //   const AddtoCart: React.FC<CartProps> = ({}) => {
// //     const [cartItem, setCartData] = useState<Cart[]>([]);

// //     useEffect(() => {
// //             getCartWithItems();
// //           }, []);

// //     const getCartWithItems = async (): Promise<void> => {
// //           const token = localStorage.getItem('token');
          
// //           try {
// //             const response = await fetch(`${baseURL}/cart/userCartWithItems`,{ headers: { 
// //               'Authorization': `Bearer ${token}`,
// //               "Cache-Control": "no-store" } });
// //             const data = await response.json();
// //             console.log(token);
// //             console.log(response);
// //             setCartData(data.data);
// //           } catch (error) {
// //             console.error('Error fetching products:', error);
// //           }
// //         };
        
// //   return (
// //     <>
// //     <section className="py-5 sm:py-7 ">
// //        <div className="container max-w-screen-xl mx-auto px-4">
// //        <h2 className="text-3xl text-center font-semibold mb-2">
// //             Cart
// //         </h2>
// //        </div>
// //      </section>
     
// //     <div className="flex flex-col m-4">
// //         {/* <div className={tablesize.fullWidthTable}></div> */}
// //          <table className="md:w-full table-fixed p-2 ">
// //          <thead>
// //             <tr className="border-b">
// //               <th className="">Product</th>
// //               <th className="">Price</th>
// //               <th className="">Quantity</th>
// //               <th className="">Subtotal</th>
// //             </tr>
// //             <tr></tr>
// //           </thead>
// //            <tbody className="text-cyan-900 bg-white text-center">
// //             {/* {cartItem.map((data) => (
// //               <tr className="border p-2" key={data.id}>
// //                 <td className="p-2">
// //                     <img src={`${imageURL}${data.imageUrl}`} 
// //                          className="w-20 h-20 object-cover" alt={data.name} />
// //                 </td>  
// //                 <td className=" p-2">{data.name}<br/>{data.description}</td>
// //                 <td className="p-2">{data.price}</td>
// //               </tr>
// //             ))} */}
// //            </tbody>
// //          </table>
// //          <aside>
// //           <div className="md:w-1/4">

// //           </div>
// //          </aside>
        
// //     </div>
// //     </>
// //   )
// // }

// // export default AddtoCart


// // // "use client";

// // // import React, { useEffect, useState } from "react";
// // // import { imageURL,baseURL } from "@/utils/constants";
// // // import Link from "next/link";

// // // interface Cart {
// // //     id: number;
// // //     name: string;
// // //     description: string;
// // //     price: number;
// // //     quantity:number;
// // //     imageUrl: string;
// // //   }
  
// // //   interface CartProps {}
// // //   const Cart: React.FC<CartProps> = ({}) => {
  
// // //     const [cartItem, setCartData] = useState<Cart[]>([]);
    
// // //     useEffect(() => {
// // //       getCartWithItems();
// // //     }, []);
  
// // //   const getCartWithItems = async (): Promise<void> => {
// // //     const token = localStorage.getItem('token');
    
// // //     try {
// // //       const response = await fetch(`${baseURL}/cart/userCartWithItems`,{ headers: { 
// // //         'Authorization': `Bearer ${token}`,
// // //         "Cache-Control": "no-store" } });
// // //       const data = await response.json();
// // //       console.log(token);
// // //       console.log(response);
// // //       setCartData(data.data);
// // //     } catch (error) {
// // //       console.error('Error fetching products:', error);
// // //     }
// // //   };
  

// // //   return (
// // //     <>
// // //       <section className="py-5 sm:py-7 ">
// // //         <div className="container max-w-screen-xl mx-auto px-4">
// // //           <h2 className="text-3xl text-center font-semibold mb-2">
// // //              Cart
// // //           </h2>
// // //         </div>
// // //       </section>

    
// // //         <section className="py-2">
// // //           <div className="container  mx-auto px-4">
// // //             <div className="flex flex-col md:flex-row gap-4">
// // //               <main className="md:w-full">
// // //                 <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
// // //                 {cartItem.map((item) => (
// // //                     <div>
// // //                       <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
// // //                         <div className="w-full lg:w-2/5 xl:w-2/4">
// // //                           <figure className="flex leading-5">
// // //                             <div>
// // //                               <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
// // //                                 <img src={`${imageURL}${item.imageUrl}`}  alt={item.name} />
// // //                               </div>
// // //                             </div>
// // //                             <figcaption className="ml-3">
// // //                               <p>
// // //                                 <a href="#" className="hover:text-blue-600">
// // //                                   {item.name}
// // //                                 </a>
// // //                               </p>
// // //                               <p className="mt-1 text-gray-400">
// // //                                 {" "}
// // //                                 {/* Seller: {item.seller} */}
// // //                               </p>
// // //                             </figcaption>
// // //                           </figure>
// // //                         </div>
// // //                         <div className="w-24">
// // //                           <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
// // //                             <button
// // //                               data-action="decrement"
// // //                               className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
// // //                               // onClick={() => decreaseQty(item)}
// // //                             >
// // //                               <span className="m-auto text-2xl font-thin">
// // //                                 −
// // //                               </span>
// // //                             </button>
// // //                             <input
// // //                               type="number"
// // //                               className=" focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
// // //                               name="custom-input-number"
// // //                               value={item.quantity}
// // //                               readOnly
// // //                             ></input>
// // //                             <button
// // //                               data-action="increment"
// // //                               className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
// // //                               // onClick={() => increaseQty(item)}
// // //                             >
// // //                               <span className="m-auto text-2xl font-thin">
// // //                                 +
// // //                               </span>
// // //                             </button>
// // //                           </div>
// // //                         </div>
// // //                         <div>
// // //                           <div className="leading-5">
// // //                             <p className="font-semibold not-italic">
// // //                               {/* ${item.price * item.quantity.toFixed(2)} */}
// // //                             </p>
// // //                             <small className="text-gray-400">
// // //                               {" "}
// // //                               ${item.price} / per item{" "}
// // //                             </small>
// // //                           </div>
// // //                         </div>
// // //                         <div className="flex-auto">
// // //                           <div className="float-right">
// // //                             <a
// // //                               className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
// // //                               // onClick={() =>
// // //                               //   deleteItemFromCart(item?.product)
// // //                               // }
// // //                             >
// // //                               Remove
// // //                             </a>
// // //                           </div>
// // //                         </div>
// // //                       </div>

// // //                       <hr className="my-4" />
// // //                     </div>
// // //                   ))}
// // //                 </article>
// // //               </main>
              
// // //             </div>
// // //           </div>
// // //         </section>
// // //       {/* )} */}
// // //     </>
// // //   );
// // // };

// // // export default Cart;


// "use client";

// import React, { useEffect, useState } from "react";
// import { imageURL,baseURL } from "@/utils/constants";
// import Link from "next/link";

// interface Cart {
//       id: number;
//       name: string;
//       description: string;
//       price: number;
//       quantity:number;
//       imageUrl: string;
//     }

//     interface CartProps {}


//     const Cart: React.FC<CartProps> = ({}) => {

//   const [cartItem, setCartData] = useState<Cart[]>([]);
//   useEffect(() => {
//           getCartWithItems();
//         }, []);

//         const getCartWithItems = async (): Promise<void> => {
//               const token = localStorage.getItem('token');
              
//               try {
//                 const response = await fetch(`${baseURL}/cart/userCartWithItems`,{ headers: { 
//                   'Authorization': `Bearer ${token}`,
//                   "Cache-Control": "no-store" } });
//                 const data = await response.json();
//                 console.log(token);
//                 console.log(response);
//                 setCartData(data.data);
//               } catch (error) {
//                 console.error('Error fetching products:', error);
//               }
//             };      

//   return (
//     <>
//       <section className="py-5 sm:py-7 ">
//         <div className="container max-w-screen-xl mx-auto px-4">
//           <h2 className="text-3xl text-center font-semibold mb-2">
//              Cart
//           </h2>
//         </div>
//       </section>

    
//         <section className="py-4">
//           <div className="container max-w-screen-xl mx-auto px-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               <main className="md:w-3/4">
//                 <article className=" rounded mb-5 p-3 lg:p-5">
//                   {/* {cart?.cartItems?.map(() => ( */}
//                   <div className="flex flex-col m-4">
//         <table className="md:w-full table-fixed p-2">
//           <thead>
//             <tr className="border-b">
//               <th className="w-1/5">Product</th>
//               <th className="w-1/5">Price</th>
//               <th className="w-1/5">Quantity</th>
//               <th className="w-1/5">Subtotal</th>
             
//             </tr>
//           </thead>
//           <tbody className="text-cyan-900 bg-white text-center">
//             {cartItem.map((data) => (
//               <tr className="border p-2" key={data.id}>
//                 <td className="w-1/5 p-2">
//                   <figure className="flex leading-5">
//                     <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
//                       <img src={`${imageURL}${data.cartItems.Product.imageUrl}`} alt={data.name} className="w-full h-full object-cover" />
//                     </div>
//                     <figcaption className="ml-3">
//                       <p>{data.name}</p>
//                       <p className="mt-1 text-gray-400">{data.cartItems.Product.description}</p>
//                     </figcaption>
//                   </figure>
//                 </td>
//                 <td className="w-1/5 p-2">{data.cartItems.Product.price}</td>
//                 <td className="w-1/5 p-2">
//                   <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
//                     <button
//                       className="border hover:bg-gray-100 h-full w-20 rounded-l cursor-pointer outline-none"
//                       // onClick={() => decreaseQty(cartItem)}
//                     >
//                       <span className="m-auto text-2xl font-thin"></span>
//                     </button>
//                     <input
//                       type="number"
//                       className="border focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-900  outline-none custom-input-number"
//                       name="custom-input-number"
//                       value={data.cartItems.quantity}
//                       readOnly
//                     ></input>
//                     <button
//                       data-action="increment"
//                       className="border hover:bg-gray-100 h-full w-20 rounded-r cursor-pointer"
//                       // onClick={() => increaseQty(cartItem)}
//                     >
//                       <span className="m-auto text-2xl font-thin">+</span>
//                     </button>
//                   </div>
//                 </td>
//                 <td className="w-1/5 p-2">$</td>
//                 {/* {data.price * data.quantity.toFixed(2)} */}
//                 <td className="w-1/5 p-2">
//                   <a
//                     className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
//                     // onClick={() => deleteItemFromCart(data?.product)}
//                   >
//                     Remove
//                   </a>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//                   {/* ))} */}
//                 </article>
//               </main>
//               <aside className="md:w-1/4">
//                 <article className="border  border-gray-200 bg-white shadow-sm rounded mb-2 p-1 lg:p-2">
//                   <h1 className="font-bold font-sans text-xl mb-2">Cart Total</h1>
//                   <ul className="mb-5  p-2">
                    
//                     <li className="flex text-sm font-bold border-b mb-2 justify-between text-gray-600  ">
//                       <span className="mb-2">Subtotal</span>
//                       <span></span>
//                     </li>
//                     <li className="flex justify-between  mb-1">
//                       <span className="text-sm font-bold mb-2 ">Shipping</span>
//                       <span className="text-sm">
//                         <p className="pb-1">Flat rate:<span className="px-1 font-color font-bold"></span></p>
                        
//                         <p className="text-gray-400 pb-1">Shipping to Kerala</p>
//                         <p className="font-color font-bold pb-1">Change address</p>
//                       </span>
//                     </li>
//                     <li className="text-lg font-bold border-t flex justify-between mt-3 pt-4">
//                       <span>Total</span>
//                       <span className="font-color font-bold"></span>
//                     </li>
//                   </ul>

//                   <a className="px-4 py-1 mb-2 inline-block text-sm w-full text-center  text-white bg-primary-color border border-transparent rounded-md cursor-pointer">
//                     Proceed To Checkout
//                   </a>

                 
//                 </article>
//               </aside>
//             </div>
//           </div>
//         </section>
//       {/* )} */}
//     </>
//   );
// };

// export default Cart;