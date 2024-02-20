import { baseURL } from "@/utils/constants";
import axios from 'axios';

// export const getBadgeCount = async () => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`${baseURL}/users/badge-count`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           "Cache-Control": "no-store",
//         },
//       });
//       console.log(response.data);
      
//       return { data: response.data, status: response.status }; 
//     } catch (error) {
//         return { error: 'Error fetching count' };
//     }
//   };

 export  const getBadgeCount = async ()=> {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${baseURL}/users/badge-count`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          "Cache-Control": "no-store",
        },
      });
      const data = await response.json();
      console.log(token);
      console.log(response);
      return { data, status: response.status }; 
    } catch (error) {
    return { error: 'Error fetching count' };
      
    }
  };