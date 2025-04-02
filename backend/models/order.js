
const db = require('../config/database');

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

      // Start a transaction
      await db.query('START TRANSACTION');

      // Insert order
      const [orderResult] = await db.query(
        'INSERT INTO orders (customer_info, total, status, order_date) VALUES (?, ?, ?, NOW())',
        [JSON.stringify(customer_info), total, status]
      );
      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of items) {
        await db.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product.id, item.quantity, item.product.price]
        );
      }

      // Commit the transaction
      await db.query('COMMIT');

      return orderId;
    } catch (error) {
      // Rollback the transaction in case of error
      await db.query('ROLLBACK');
      console.error('Error creating order:', error);
      throw error;
    }
  }

  // Get an order by ID
  static async findById(id) {
    try {
      // Get the order
      const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
      if (orders.length === 0) return null;
      
      const order = orders[0];

      // Get the order items
      const [items] = await db.query(
        `SELECT oi.*, p.name, p.image, p.category 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [id]
      );

      // Parse the customer_info JSON
      order.customer_info = JSON.parse(order.customer_info);
      
      // Add the items to the order
      order.items = items.map(item => ({
        id: item.id,
        product: {
          id: item.product_id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category
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
      const [rows] = await db.query('SELECT * FROM orders ORDER BY order_date DESC');
      return rows;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  // Update order status
  static async updateStatus(id, status) {
    try {
      const [result] = await db.query(
        'UPDATE orders SET status = ? WHERE id = ?',
        [status, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error updating status for order with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Order;
