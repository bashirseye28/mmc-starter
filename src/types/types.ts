// Define Product Interface
export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;  // 🔹 Ensure it matches Firebase field (image, NOT imageUrl)
    category: string;
  }
  
  // Define CartItem that extends Product
  export interface CartItem extends Product {
    quantity: number;  // ✅ Ensure cart items have a quantity field
  }