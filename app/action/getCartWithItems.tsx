import { imageURL, baseURL } from "@/utils/constants";

const getCartWithItems = async (): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) {
      return 401;
  }
  try {
      const response = await fetch(`${baseURL}/cart/userCartWithItems`, {
          headers: {
              'Authorization': `Bearer ${token}`,
              "Cache-Control": "no-store"
          }
      });
      
      const data = await response.json();
      console.log(data);
      return { data, status: response.status }; 
  } catch (error) {
      console.error('Error fetching products:', error);
      return 500; 
  }
};

  //   if (!token) {
  //  return 401;
  // }
  //   try {
  //     const response = await fetch(`${baseURL}/cart/userCartWithItems`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         "Cache-Control": "no-store",
  //       },
  //     });
  //     const data = await response.json();
  //     console.log(token);
  //     console.log(response);
  //     return { data, status: response.status }; 
  //   //   setCartData(data.data);
  //   } catch (error) {
  //   //   console.error('Error fetching products:', error);
  //     return { error: 'Error fetching subcategory' };
      
  //   }
  // };

//   export const getWishlist = async (): Promise<any> => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         return 401;
//     }
//     try {
//         const response = await fetch(`${baseURL}/wishlist/`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 "Cache-Control": "no-store"
//             }
//         });
        
//         const data = await response.json();
//         console.log(data);
//         return { data, status: response.status }; 
//     } catch (error) {
//         console.error('Error fetching wishlist:', error);
//         return 500; 
//     }
// };


  export default getCartWithItems;