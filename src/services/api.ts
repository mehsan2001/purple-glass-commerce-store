
import { createClient } from '@supabase/supabase-js';
import { Product, CartItem, CustomerInfo } from '../types';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Use the Supabase client from the integrations folder which has the correct configuration
export const supabase = supabaseClient;

// Products API
export const productsApi = {
  getAllProducts: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase
        .from('purpleglass_products')
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
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description || '',
        features: Array.isArray(product.features) ? product.features : 
                  (typeof product.features === 'string' ? JSON.parse(product.features) : []),
        image: product.image || '',
        category: product.category || ''
      }));
    } catch (error) {
      console.error("Error in getAllProducts:", error);
      throw error;
    }
  },
  
  getProductById: async (id: number): Promise<Product> => {
    try {
      const { data, error } = await supabase
        .from('purpleglass_products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
      }
      
      if (!data) {
        throw new Error(`Product with ID ${id} not found`);
      }
      
      // Convert features to string[] if needed
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description || '',
        features: Array.isArray(data.features) ? data.features : 
                (typeof data.features === 'string' ? JSON.parse(data.features) : []),
        image: data.image || '',
        category: data.category || ''
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
        .from('purpleglass_orders')
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
      
      // Insert the order items
      const { error: itemsError } = await supabase
        .from('purpleglass_order_items')
        .insert(orderItems);
      
      if (itemsError) {
        console.error("Error creating order items:", itemsError);
        throw itemsError;
      }
      
      console.log("Order items created successfully");
      
      // Return a properly formatted result object
      return {
        id: orderId
      };
    } catch (error) {
      console.error("Error in createOrder function:", error);
      throw error;
    }
  },
  
  getOrderById: async (id: number) => {
    try {
      console.log("Fetching order with ID:", id);
      
      // Fetch the order
      const { data: order, error } = await supabase
        .from('purpleglass_orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching order:", error);
        throw error;
      }
      
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }
      
      // Fetch the order items
      const { data: items, error: itemsError } = await supabase
        .from('purpleglass_order_items')
        .select('*')
        .eq('order_id', id);
      
      if (itemsError) {
        console.error("Error fetching order items:", itemsError);
        throw itemsError;
      }
      
      // Format the items for the frontend
      const formattedItems = (items || []).map((item: any) => ({
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
      
      // Return the complete order with items
      return {
        ...order,
        items: formattedItems
      };
    } catch (error) {
      console.error("Error in getOrderById function:", error);
      throw error;
    }
  },
};

export default supabase;
