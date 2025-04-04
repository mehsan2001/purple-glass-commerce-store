
const supabase = require('../config/supabase');

class Order {
  // Create a new order
  static async create(orderData) {
    try {
      const { 
        customer_info, 
        items, 
        total, 
        status = 'pending' 
      } = orderData;

      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          { 
            customer_info, 
            total, 
            status, 
            order_date: new Date().toISOString() 
          }
        ])
        .select();

      if (orderError) throw orderError;
      
      const orderId = orderData[0].id;

      // Insert order items
      const orderItems = items.map(item => ({
        order_id: orderId,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      return orderId;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get an order by ID
  static async findById(id) {
    try {
      // Get the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (orderError) throw orderError;
      if (!order) return null;
      
      // Get the order items with product details
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select(`
          id,
          product_id,
          quantity,
          price,
          products (
            id,
            name,
            price,
            image,
            category
          )
        `)
        .eq('order_id', id);

      if (itemsError) throw itemsError;
      
      // Format the items to match the expected structure
      order.items = orderItems.map(item => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.products.name,
          price: item.price,
          image: item.products.image,
          category: item.products.category
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
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('order_date', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Update order status
  static async updateStatus(id, status) {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error updating status for order with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Order;
