import React, { useState, useEffect } from 'react'
import { imageURL, baseURL } from "@/utils/constants";

export const sortBy = async (categoryId: number,selectedFilter:string) => {
    // const [selectedFilter, setSelectedFilter] = useState("all");

    try {
      const url =
  selectedFilter === 'name'
    ? `${baseURL}/product-category?categoryId=${categoryId}&&sortBy=name`
    : selectedFilter === 'price'
    ? `${baseURL}/product-category?categoryId=${categoryId}&&sortBy=price`
    : selectedFilter === 'stockQuantity'
    ? `${baseURL}/product-category?categoryId=${categoryId}&&sortBy=stockQuantity`
    : selectedFilter === 'offerPrice'
    ?`${baseURL}/product-category?categoryId=${categoryId}&&sortBy=offerPrice`
    : selectedFilter === 'offerPercentage'
    ? `${baseURL}/product-category?categoryId=${categoryId}&&sortBy=offerPercentage`
    : `${baseURL}/product-category?categoryId=${categoryId}`;

    const response = await fetch(url, { cache: 'no-store' },
    //   {
    //     params: { page: currentPage, filter: selectedFilter },
    //   }
      );  
     
      const data = await response.json();
      console.log(response);
      console.log(data);
      return { data, status: response.status }; 
    //   setRecipesData(data.data);
    //   setDataResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
