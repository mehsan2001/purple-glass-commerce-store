
import { createClient } from '@supabase/supabase-js';
import { Product, CartItem, CustomerInfo } from '../types';

// Create Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Products API
export const productsApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from('purpleglass_products')
      .select('*');
    
    if (error) throw error;
    return data;
  },
  
  getProductById: async (id: number): Promise<Product> => {
    const { data, error } = await supabase
      .from('purpleglass_products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
};

// Orders API
export const ordersApi = {
  createOrder: async (orderData: {
    customer_info: CustomerInfo,
    items: CartItem[],
    total: number
  }) => {
    const { data, error } = await supabase
      .from('purpleglass_orders')
      .insert([
        {
          customer_info: orderData.customer_info,
          total: orderData.total,
          status: 'pending',
          order_date: new Date().toISOString()
        }
      ])
      .select();
    
    if (error) throw error;
    
    const orderId = data[0].id;
    
    // Insert order items
    const orderItems = orderData.items.map(item => ({
      order_id: orderId,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price
    }));
    
    const { error: itemsError } = await supabase
      .from('purpleglass_order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;
    
    return data[0];
  },
  
  getOrderById: async (id: number) => {
    const { data: order, error } = await supabase
      .from('purpleglass_orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    const { data: items, error: itemsError } = await supabase
      .from('purpleglass_order_items')
      .select(`
        id,
        product_id,
        quantity,
        price,
        purpleglass_products (
          id,
          name,
          price,
          image,
          category
        )
      `)
      .eq('order_id', id);
    
    if (itemsError) throw itemsError;
    
    order.items = items.map(item => ({
      id: item.id,
      product: {
        id: item.product_id,
        name: item.purpleglass_products.name,
        price: item.price,
        image: item.purpleglass_products.image,
        category: item.purpleglass_products.category
      },
      quantity: item.quantity,
      price: item.price
    }));
    
    return order;
  },
};

export default supabase;
