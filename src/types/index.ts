// src/types/index.ts
export interface Product {
    id: number;
    name: string;
    category: string;
    description: string;
    price: number;
    offerPrice?: number;
    stock: number;
    image: string;
  }
  
  export interface User {
    name: string;
    email: string;
    dob: string;
    password?: string;
    failedAttempts: number;
    isLocked: boolean;
  }
  
  export interface CartItem {
    product: Product;
    quantity: number;
  }