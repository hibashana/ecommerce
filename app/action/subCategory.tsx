import { baseURL } from "@/utils/constants";

const getSubCategoryData = async (categoryId: number) => {
    try {
        const response = await fetch(`${baseURL}/product-category?categoryId=${categoryId}`, { cache: 'no-store' });
        const data = await response.json();
        console.log(data);
        return { data, status: response.status }; 
    } catch (error) {
        console.error('Error fetching subcategory:', error);
        return { error: 'Error fetching subcategory' };
    }
};

export default getSubCategoryData;