
import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="glass flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg mb-4">
      <div className="flex items-center mb-4 sm:mb-0">
        <div className="w-16 h-16 flex-shrink-0 bg-secondary/50 rounded-md overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-white">{product.name}</h3>
          <p className="text-gray-300">Rs {Math.round(product.price)}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => updateQuantity(product.id, quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="mx-3 text-white">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <div className="text-right sm:min-w-[100px]">
          <p className="font-semibold text-white">Rs {Math.round(product.price * quantity)}</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
