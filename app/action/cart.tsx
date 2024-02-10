// import { Toaster, toast } from 'sonner';
// import { useRouter } from 'next/router'; // Change import to 'next/router'
// import { baseURL } from "@/utils/constants";

// const addtoCart = async (productId: number): Promise<void> => {
//     // const router = useRouter();
//     const token = localStorage.getItem('token');
//     // if (!token) {
//     //     router.push('/login');
//     //     return;
//     // }
//     try {
//         const response = await fetch(`${baseURL}/cart/addToCart?productId=${productId}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 "Cache-Control": "no-store"
//             }
//         });
//         const data = await response.json();
//         if (response.status === 200) {
//             toast.success("Product Added to cart");
//             console.log(response);
//             // router.push("/addtoCart");
//         } else {
//             toast.error("Failed to Add Product to cart");
//             console.error("Failed to Add");
//         }
//     } catch (error) {
//         console.error('Error while adding the product to cart:', error);
//     }
// };


// export default addtoCart;