import { baseURL } from "@/utils/constants";

const getSubCategoryData = async (categoryId: any,selectedValue:string,page:string) => {
    try {
        console.log(`get=${categoryId}`);
        
        const response = await fetch(`${baseURL}/product-category?categoryId=${categoryId}&sortBy=${selectedValue}&page=${page}`, { cache: 'no-store' });
        const data = await response.json();
        console.log(data);
        return { data, status: response.status }; 
    } catch (error) {
        console.error('Error fetching subcategory:', error);
        return { error: 'Error fetching subcategory' };
    }
};

export default getSubCategoryData;