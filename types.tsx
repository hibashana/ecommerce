
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