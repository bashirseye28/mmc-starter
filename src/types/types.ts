export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}