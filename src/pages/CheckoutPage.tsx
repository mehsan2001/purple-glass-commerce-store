
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCart } from '@/context/CartContext';
import { CustomerInfo } from '@/types';
import { toast } from 'sonner';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  address: z.string().min(5, { message: 'Address must be at least 5 characters' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters' }),
  zipCode: z.string().min(3, { message: 'Zip code must be at least 3 characters' }),
  country: z.string().min(2, { message: 'Country must be at least 2 characters' }),
});

const CheckoutPage = () => {
  const { cartItems, cartTotal, setCustomerInfo, placeOrder } = useCart();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setCustomerInfo(data as CustomerInfo);
    
    toast.promise(placeOrder(), {
      loading: 'Processing your order...',
      success: () => {
        navigate('/order-complete');
        return 'Order placed successfully!';
      },
      error: 'Failed to place order',
    });
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Customer Information</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="First Name" 
                            className="glass-input text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Last Name" 
                            className="glass-input text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Your Email" 
                          className="glass-input text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Address</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Street Address" 
                          className="glass-input text-white" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">City</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="City" 
                            className="glass-input text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Zip Code</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Zip/Postal Code" 
                            className="glass-input text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Country</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Country" 
                            className="glass-input text-white" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="lg:hidden">
                  <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6 bg-orange hover:bg-orange-dark text-white" 
                    size="lg"
                  >
                    Complete Order
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="glass rounded-lg p-6 sticky top-24">
            <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
            
            <Button 
              onClick={form.handleSubmit(handleSubmit)} 
              className="w-full mt-6 bg-orange hover:bg-orange-dark text-white" 
              size="lg"
            >
              Complete Order
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper component for order summary
const OrderSummary = ({ cartItems, cartTotal }: { cartItems: any[], cartTotal: number }) => (
  <>
    <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
    
    <div className="space-y-4 mb-4">
      {cartItems.map(item => (
        <div key={item.product.id} className="flex justify-between text-gray-300 text-sm">
          <span>{item.quantity} × {item.product.name}</span>
          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
    
    <Separator className="my-4 bg-white/10" />
    
    <div className="space-y-4 mb-2">
      <div className="flex justify-between text-gray-300">
        <span>Subtotal</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-300">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <Separator className="my-2 bg-white/10" />
      <div className="flex justify-between text-white font-semibold text-lg">
        <span>Total</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
    </div>
  </>
);

export default CheckoutPage;
