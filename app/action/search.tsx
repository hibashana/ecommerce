import { baseURL } from "@/utils/constants";

export const Search = async (name:string) => {
    try {
      const response = await fetch(
        `${baseURL}/product?name=${name}`,
        { cache: "no-store" }
      );
      const data = await response.json();
      return { data, status: response.status }; 
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
    
  }; 