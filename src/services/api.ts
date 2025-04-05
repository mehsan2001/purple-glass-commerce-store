
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
    // Log the order data to help with debugging
    console.log("Creating order with data:", orderData);
    
    try {
      // Insert the order first
      const { data: orderResult, error: orderError } = await supabase
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
    
      if (orderError) {
        console.error("Error creating order:", orderError);
        throw orderError;
      }
      
      if (!orderResult || orderResult.length === 0) {
        console.error("No order ID returned after insert");
        throw new Error("Failed to create order: No order ID returned");
      }
      
      const orderId = orderResult[0].id;
      console.log("Order created with ID:", orderId);
      
      // Insert order items
      const orderItems = orderData.items.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      console.log("Inserting order items:", orderItems);
      
      const { error: itemsError } = await supabase
        .from('purpleglass_order_items')
        .insert(orderItems);
      
      if (itemsError) {
        console.error("Error creating order items:", itemsError);
        throw itemsError;
      }
      
      console.log("Order items created successfully");
      
      return orderResult[0];
    } catch (error) {
      console.error("Error in createOrder function:", error);
      throw error;
    }
  },
  
  getOrderById: async (id: number) => {
    try {
      console.log("Fetching order with ID:", id);
      
      const { data: order, error } = await supabase
        .from('purpleglass_orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching order:", error);
        throw error;
      }
      
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
      
      if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        throw itemsError;
      }
      
      // Fix the structure of the order items - the bug was here
      const formattedItems = items.map(item => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.purpleglass_products?.name,
          price: item.price,
          image: item.purpleglass_products?.image,
          category: item.purpleglass_products?.category
        },
        quantity: item.quantity,
        price: item.price
      }));
      
      order.items = formattedItems;
      
      return order;
    } catch (error) {
      console.error("Error in getOrderById function:", error);
      throw error;
    }
  },
};

export default supabase;
