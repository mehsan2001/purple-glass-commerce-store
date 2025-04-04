
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

const OrderCompletePage = () => {
  const { lastOrder } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lastOrder) {
      navigate('/');
    }
  }, [lastOrder, navigate]);

  if (!lastOrder) {
    return null;
  }

  return (
    <Layout>
      <div className="glass max-w-3xl mx-auto p-8 rounded-lg">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-300">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Order Details</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="text-sm text-gray-400">Order ID</p>
              <p>{lastOrder.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p>{lastOrder.date.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Name</p>
              <p>{lastOrder.customerInfo.firstName} {lastOrder.customerInfo.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p>{lastOrder.customerInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Shipping Address</p>
              <p>
                {lastOrder.customerInfo.address}, {lastOrder.customerInfo.city}, {lastOrder.customerInfo.zipCode}, {lastOrder.customerInfo.country}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Payment Method</p>
              <p>
                {lastOrder.customerInfo.paymentMethod === 'cod' 
                  ? 'Cash on Delivery' 
                  : 'Bank Transfer'}
              </p>
            </div>
            {lastOrder.customerInfo.paymentMethod === 'bank_transfer' && lastOrder.customerInfo.bankAccountName && (
              <div>
                <p className="text-sm text-gray-400">Account Details</p>
                <p>
                  {lastOrder.customerInfo.bankAccountName} - {lastOrder.customerInfo.bankAccountNumber}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-4">
            {lastOrder.items.map(item => (
              <div key={item.product.id} className="flex justify-between text-gray-300">
                <span>{item.quantity} × {item.product.name}</span>
                <span>Rs {Math.round(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          
          <Separator className="my-4 bg-white/10" />
          
          <div className="flex justify-between text-white font-semibold">
            <span>Total</span>
            <span>Rs {Math.round(lastOrder.total)}</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-300 mb-6">
            A confirmation email has been sent to {lastOrder.customerInfo.email}
          </p>
          <Button 
            onClick={() => navigate('/')} 
            className="bg-purple hover:bg-purple-dark text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderCompletePage;
