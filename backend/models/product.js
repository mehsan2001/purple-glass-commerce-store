
const db = require('../config/database');

class Product {
  // Get all products
  static async findAll() {
    try {
      const [rows] = await db.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get a product by ID
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new product
  static async create(productData) {
    try {
      const { name, price, description, features, image, category } = productData;
      const [result] = await db.query(
        'INSERT INTO products (name, price, description, features, image, category) VALUES (?, ?, ?, ?, ?, ?)',
        [name, price, description, JSON.stringify(features), image, category]
      );
      return result.insertId;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update a product
  static async update(id, productData) {
    try {
      const { name, price, description, features, image, category } = productData;
      const [result] = await db.query(
        'UPDATE products SET name = ?, price = ?, description = ?, features = ?, image = ?, category = ? WHERE id = ?',
        [name, price, description, JSON.stringify(features), image, category, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a product
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Product;
