import { baseURL } from "@/utils/constants";

const fetchCategoryData = async (parentId:any) => {
    try {
       // const parentId = window.location.pathname.split('/').pop();
        const response = await fetch(`${baseURL}/category/${parentId}`, { cache: 'no-store' });
        const data = await response.json();
        return data;
    } catch (error) {
         console.error('Error fetching category');
        return { error: 'Error fetching category' };
    }
};

export default fetchCategoryData;