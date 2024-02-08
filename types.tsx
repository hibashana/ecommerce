
// export interface Forgotpass {
//     // id: string;
//     email: string;
    
//   };

 export interface Product {
    id: number;
    name: string;
    description: string;
    stockQuantity: number;
    offerPrice: number;
    price: number;
    imageUrl: string;
    offerPercentage: number;
    ProductImages: ProductImage[];
  }

  export interface CategoryItem {
    id: number;
    imageUrl: string;
    name: string;
  }
  
  export interface SubCategoryItem {
    id: number;
    imageUrl: string;
    parentId: number;
    name: string;
  }

  export interface ProductImage {
    id: string;
    imageUrl: string;
    isThumbnail: boolean;
  }
  export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    amount: string;
    createdAt: string;
    updatedAt: string;
    Product: Product;
  }
  
  export interface CartData {
    id: string;
    userId: string;
    status: string;
    discount: string;
    cartItems: CartItem[];
  }