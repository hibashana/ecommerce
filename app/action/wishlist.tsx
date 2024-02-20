
  import { baseURL } from "@/utils/constants";

  export const addtoWishlist= async (productId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return 401;
    }
    try {
        const response = await fetch(`${baseURL}/wishlist/addToWishlist?productId=${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Cache-Control": "no-store"
            }
        });
        // if (!token) {
        //     return response.status;
        // }
        // const data = await response.json();
        // else 
        return response.status;
    } catch (error) {
        // console.error('Error while adding the product to wh:', error);
        // return 500; 
    }
};

 export const getWishlist = async (): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) {
        return 401;
    }
    try {
        const response = await fetch(`${baseURL}/wishlist/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Cache-Control": "no-store"
            }
        });
        
        const data = await response.json();
        console.log(data);
        return { data, status: response.status }; 
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        return 500; 
    }
};



