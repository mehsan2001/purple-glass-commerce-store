
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ChevronLeft, Minus, Plus, Check } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <Layout>
        <div className="glass rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-gray-300 mb-6">
            The product you are looking for does not exist.
          </p>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <Layout>
      <Button 
        variant="ghost" 
        className="mb-8 text-white" 
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="glass rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-4">{product.category}</p>
            <h2 className="text-2xl font-bold text-white mb-6">${product.price.toFixed(2)}</h2>
            
            <div className="mb-6">
              <p className="text-gray-300 mb-4">{product.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-white mb-2">Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center mb-6">
              <span className="text-white mr-4">Quantity:</span>
              <div className="flex items-center glass-input p-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={decrementQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-4 text-white">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button 
              className={`w-full ${added ? 'bg-green-600' : 'bg-orange hover:bg-orange-dark'} text-white`}
              onClick={handleAddToCart}
            >
              {added ? (
                <><Check className="h-4 w-4 mr-2" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart</>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
