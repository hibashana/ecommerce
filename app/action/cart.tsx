import { baseURL } from "@/utils/constants";

const addtoCart = async (productId: number): Promise<number> => {
    const token = localStorage.getItem('token');
    if (!token) {
        return 401;
    }
    try {
        const response = await fetch(`${baseURL}/cart/addToCart?productId=${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Cache-Control": "no-store"
            }
        });
        // const data = await response.json();
        return response.status;
    } catch (error) {
        console.error('Error while adding the product to cart:', error);
        return 500; 
    }
};

export default addtoCart;
