import { imageURL, baseURL } from "@/utils/constants";
import axios from 'axios';


export const incrementQuantity = async (cartItemId: string)=> {
    try {
     const response = await fetch(`${baseURL}/cart/increment?cartItemId=${cartItemId}`, {
       headers: {
         "Cache-Control": "no-store",
       },
            });
             if (response.status === 200) {
                // console.log(`Product added.`); 
                return response.status
               
            //    getCartWithItems();     
             } else {
              //  console.error("Failed to add" );
                  return response.status
             }
           }  catch (error) {
               console.error('Error while adding product:', error);
             }  
         };


 export const decrementQuantity = async (cartItemId: string)=> {
            try {
                const response = await fetch(`${baseURL}/cart/decrement?cartItemId=${cartItemId}`, {
               headers: {
                 "Cache-Control": "no-store",
               },
                    });
                     if (response.status === 200) { 
                        return response.status    
                     } else {
                          return response.status
                     }
                   }  catch (error) {
                       console.error('Error while removing product:', error);
                     }  
                 };

  
  export const removeFromCart = async (cartItemId: string)=> {
      const token = localStorage.getItem('token');
      const confirmDelete = window.confirm("Are you sure you want to delete the Product?");
      if (confirmDelete) {
        try {
          const URL = `${baseURL}/cart/removeFromCart?cartItemId=${cartItemId}`;
          const response = await axios.get(`${URL}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Cache-Control": 'no-store',
            },
          });
          if (response.status === 200) {
            return response.status
          } else {
            return response.status
          }
        }  catch (error) {
            console.error('Error while deleting products:', error);
          }
      }
    };             


                      