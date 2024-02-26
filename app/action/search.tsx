import { baseURL } from "@/utils/constants";

  const Search = async (name:string) => {
    try {
      const response = await fetch(
        `${baseURL}/product?name=${name}`,
         { cache: "no-store" }
     );
        const data = await response.json();
        console.log(data);
        return { data, status: response.status }; 
    } catch (error) {
        console.error('Error search Product:', error);
        return { error: 'Error' };
    }
};

export default Search;