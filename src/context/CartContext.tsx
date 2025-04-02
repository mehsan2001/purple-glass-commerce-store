
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CartItem, Product, CustomerInfo, Order } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  customerInfo: CustomerInfo | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  placeOrder: () => Promise<Order | null>;
  lastOrder: Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const [cartTotal, setCartTotal] = useState<number>(0);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage:", e);
      }
    }
  }, []);

  // Calculate cart total whenever cartItems changes
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setCartTotal(total);
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { product, quantity }];
      }
    });
    
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.info("Item removed from cart");
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const generateOrderId = () => {
    return 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const placeOrder = async (): Promise<Order | null> => {
    if (!customerInfo || cartItems.length === 0) {
      toast.error("Please provide customer information and add items to cart");
      return null;
    }

    // In a real app, you would send the order to a backend API here
    // For now, we'll just simulate a successful order

    const order: Order = {
      items: [...cartItems],
      customerInfo: { ...customerInfo },
      total: cartTotal,
      date: new Date(),
      orderId: generateOrderId()
    };

    // Simulate API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));

    setLastOrder(order);
    clearCart();
    return order;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    customerInfo,
    setCustomerInfo,
    placeOrder,
    lastOrder
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
