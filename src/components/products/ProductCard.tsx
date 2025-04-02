
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card className="glass-card overflow-hidden flex flex-col h-full transition duration-300 hover:shadow-xl hover:shadow-purple-light/10">
      <div className="p-4 flex-grow">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-square mb-4 overflow-hidden rounded-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
        </Link>
        <p className="text-gray-300 line-clamp-2 mb-4">{product.description}</p>
        <div className="flex items-baseline justify-between">
          <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
          <span className="text-sm text-gray-400">{product.category}</span>
        </div>
      </div>
      <div className="p-4 border-t border-white/10">
        <Button 
          onClick={() => addToCart(product, 1)} 
          className="w-full bg-orange hover:bg-orange-dark text-white"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
