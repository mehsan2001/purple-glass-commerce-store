
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod?: 'cod' | 'bank_transfer';
}

export interface Order {
  items: CartItem[];
  customerInfo: CustomerInfo;
  total: number;
  date: Date;
  orderId: string;
}
