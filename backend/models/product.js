
const supabase = require('../config/supabase');

class Product {
  // Get all products
  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('purpleglass_products')
        .select('*');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  // Get a product by ID
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('purpleglass_products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  }

  // Create a new product
  static async create(productData) {
    try {
      const { name, price, description, features, image, category } = productData;
      const { data, error } = await supabase
        .from('purpleglass_products')
        .insert([
          { 
            name, 
            price, 
            description, 
            features: Array.isArray(features) ? features : JSON.parse(features), 
            image, 
            category 
          }
        ])
        .select();

      if (error) throw error;
      return data[0].id;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  // Update a product
  static async update(id, productData) {
    try {
      const { name, price, description, features, image, category } = productData;
      const { error } = await supabase
        .from('purpleglass_products')
        .update({ 
          name, 
          price, 
          description, 
          features: Array.isArray(features) ? features : JSON.parse(features), 
          image, 
          category 
        })
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  }

  // Delete a product
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('purpleglass_products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Product;
