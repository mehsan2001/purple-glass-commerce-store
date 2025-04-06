
const supabase = require('../config/supabase');

class Order {
  // Create a new order
  static async create(orderData) {
    try {
      console.log("Backend: Creating order with data:", orderData);
      
      const { 
        customer_info, 
        items, 
        total, 
        status = 'pending' 
      } = orderData;

      // Insert order
      const { data: orderResult, error: orderError } = await supabase
        .from('purpleglass_orders')
        .insert([
          { 
            customer_info, 
            total, 
            status, 
            order_date: new Date().toISOString() 
          }
        ])
        .select();

      if (orderError) {
        console.error("Backend: Error creating order:", orderError);
        throw orderError;
      }
      
      if (!orderResult || orderResult.length === 0) {
        console.error("Backend: No order data returned after insert");
        throw new Error("Failed to create order");
      }
      
      const orderId = orderResult[0].id;
      console.log("Backend: Order created with ID:", orderId);

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        product_name: item.product.name, // Include the product name
        quantity: item.quantity,
        price: item.product.price
      }));

      console.log("Backend: Inserting order items:", orderItems);
      
      const { error: itemsError } = await supabase
        .from('purpleglass_order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error("Backend: Error inserting order items:", itemsError);
        throw itemsError;
      }

      return orderId;
    } catch (error) {
      console.error('Backend: Error creating order:', error);
      throw error;
    }
  }

  // Get an order by ID
  static async findById(id) {
    try {
      console.log(`Backend: Fetching order with ID ${id}`);
      
      // Get the order
      const { data: order, error: orderError } = await supabase
        .from('purpleglass_orders')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) {
        console.error(`Backend: Error fetching order with ID ${id}:`, orderError);
        throw orderError;
      }
      
      if (!order) {
        console.log(`Backend: No order found with ID ${id}`);
        return null;
      }
      
      // Get the order items with product details
      const { data: orderItems, error: itemsError } = await supabase
        .from('purpleglass_order_items')
        .select(`
          id,
          product_id,
          product_name,
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
        console.error(`Backend: Error fetching order items for order ${id}:`, itemsError);
        throw itemsError;
      }
      
      // Format the items to match the expected structure
      order.items = orderItems.map(item => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.product_name, // Use the stored product name
          price: item.price,
          image: item.purpleglass_products?.image,
          category: item.purpleglass_products?.category
        },
        quantity: item.quantity,
        price: item.price
      }));

      return order;
    } catch (error) {
      console.error(`Error fetching order with ID ${id}:`, error);
      throw error;
    }
  }

  // Get all orders
  static async findAll() {
    try {
      console.log("Backend: Fetching all orders");
      
      const { data, error } = await supabase
        .from('purpleglass_orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) {
        console.error("Backend: Error fetching orders:", error);
        throw error;
      }
      
      console.log(`Backend: Found ${data.length} orders`);
      return data;
    } catch (error) {
      console.error('Backend: Error fetching orders:', error);
      throw error;
    }
  }

  // Update order status
  static async updateStatus(id, status) {
    try {
      console.log(`Backend: Updating status for order ${id} to ${status}`);
      
      const { error } = await supabase
        .from('purpleglass_orders')
        .update({ status })
        .eq('id', id);

      if (error) {
        console.error(`Backend: Error updating status for order ${id}:`, error);
        throw error;
      }
      
      console.log(`Backend: Successfully updated status for order ${id}`);
      return true;
    } catch (error) {
      console.error(`Backend: Error updating status for order with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Order;
