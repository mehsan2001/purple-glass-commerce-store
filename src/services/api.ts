
import { createClient } from '@supabase/supabase-js';
import { Product, CartItem, CustomerInfo } from '../types';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Use the Supabase client from the integrations folder which has the correct configuration
export const supabase = supabaseClient;

// Products API
export const productsApi = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      // Cast the result to any to bypass TypeScript errors for now
      const { data, error } = await supabase
        .from('purpleglass_products' as any)
        .select('*');
      
      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      
      if (!data) {
        return [];
      }
      
      // Convert features to string[] if needed
      return data.map((product: any) => ({
        ...product,
        features: Array.isArray(product.features) ? product.features : 
                  (typeof product.features === 'string' ? JSON.parse(product.features) : [])
      }));
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      throw error;
    }
  },
  
  getProductById: async (id: number): Promise<Product> => {
    try {
      // Cast the result to any to bypass TypeScript errors for now
      const { data, error } = await supabase
        .from('purpleglass_products' as any)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      }
      
      // Convert features to string[] if needed
      return {
        ...data,
        features: Array.isArray(data.features) ? data.features : 
                (typeof data.features === 'string' ? JSON.parse(data.features) : [])
      };
    } catch (error) {
      console.error(`Error in getProductById for ID ${id}:`, error);
      throw error;
    }
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
        .from('purpleglass_orders' as any)
        .insert({
          customer_info: orderData.customer_info,
          total: orderData.total,
          status: 'pending',
          order_date: new Date().toISOString()
        })
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
      
      // Format order items with correct types
      const orderItems = orderData.items.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      console.log("Inserting order items:", orderItems);
      
      // Cast to any to bypass TypeScript errors
      const { error: itemsError } = await supabase
        .from('purpleglass_order_items' as any)
        .insert(orderItems as any);
      
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
      
      // Cast to any to bypass TypeScript errors
      const { data: order, error } = await supabase
        .from('purpleglass_orders' as any)
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching order:", error);
        throw error;
      }
      
      // When selecting from order_items, include the product_name field
      // Cast to any to bypass TypeScript errors
      const { data: items, error: itemsError } = await supabase
        .from('purpleglass_order_items' as any)
        .select('*')
        .eq('order_id', id);
      
      if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        throw itemsError;
      }
      
      if (!items || items.length === 0) {
        console.error("No items returned for order:", id);
        console.log("Returning order without items:", order);
        // Return the order without items rather than throwing an error
        return {
          ...order,
          items: []
        };
      }
      
      // Format the items - using optional chaining for safety and type casting for safety
      const formattedItems = items.map((item: any) => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.product_name || "Unknown Product",
          price: item.price || 0,
          image: "", // Default empty string for image
          category: "" // Default empty string for category
        },
        quantity: item.quantity || 0,
        price: item.price || 0
      }));
      
      console.log("Formatted items:", formattedItems);
      
      // Create a new object with the items property
      const fullOrder = {
        ...order,
        items: formattedItems
      };
      
      console.log("Returning full order:", fullOrder);
      return fullOrder;
    } catch (error) {
      console.error("Error in getOrderById function:", error);
      throw error;
    }
  },
};

export default supabase;
