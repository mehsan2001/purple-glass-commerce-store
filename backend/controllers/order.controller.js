
const Order = require('../models/order');

// Create new order controller
exports.createOrder = async (req, res) => {
  try {
    console.log("Controller: Creating new order with data:", req.body);
    const orderData = req.body;
    
    // Validate required fields
    if (!orderData.customer_info) {
      return res.status(400).json({ message: 'Customer information is required' });
    }
    
    if (!orderData.items || !Array.isArray(orderData.items) || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }
    
    if (orderData.total === undefined || orderData.total <= 0) {
      return res.status(400).json({ message: 'Valid order total is required' });
    }
    
    const orderId = await Order.create(orderData);
    console.log("Controller: Order created successfully with ID:", orderId);
    
    res.status(201).json({ id: orderId, message: 'Order created successfully' });
  } catch (error) {
    console.error('Controller: Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

// Get all orders controller
exports.getAllOrders = async (req, res) => {
  try {
    console.log("Controller: Fetching all orders");
    const orders = await Order.findAll();
    console.log(`Controller: Found ${orders.length} orders`);
    
    res.status(200).json(orders);
  } catch (error) {
    console.error('Controller: Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// Get single order controller
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(`Controller: Fetching order with ID ${orderId}`);
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      console.log(`Controller: Order with ID ${orderId} not found`);
      return res.status(404).json({ message: 'Order not found' });
    }
    
    console.log(`Controller: Successfully found order with ID ${orderId}`);
    res.status(200).json(order);
  } catch (error) {
    console.error('Controller: Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    
    console.log(`Controller: Updating status for order ${orderId} to ${status}`);
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const updated = await Order.updateStatus(orderId, status);
    
    if (!updated) {
      console.log(`Controller: Order with ID ${orderId} not found for status update`);
      return res.status(404).json({ message: 'Order not found' });
    }
    
    console.log(`Controller: Successfully updated status for order ${orderId}`);
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Controller: Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};
