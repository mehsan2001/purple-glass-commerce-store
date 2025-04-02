
-- Database creation (run this separately if needed)
-- CREATE DATABASE purpleglass_db;
-- USE purpleglass_db;

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  features JSON,
  image VARCHAR(255),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_info JSON NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample product inserts
INSERT INTO products (name, price, description, features, image, category) VALUES
(
  'Nebula Wireless Headphones', 
  149.99, 
  'Experience premium sound with our flagship Nebula wireless headphones. Featuring active noise cancellation, 40-hour battery life, and ultra-comfortable memory foam ear cushions.',
  JSON_ARRAY('Active Noise Cancellation', '40-hour battery life', 'Memory foam ear cushions', 'Touch controls', 'Voice assistant compatible'),
  '/products/headphones.png',
  'Audio'
),
(
  'Astro Smart Watch', 
  299.99, 
  'The Astro Smart Watch combines elegant design with cutting-edge technology. Track your fitness, receive notifications, and monitor your health with this premium wearable device.',
  JSON_ARRAY('Heart rate monitoring', 'Sleep tracking', 'Water resistant (50m)', '7-day battery life', 'GPS functionality'),
  '/products/smartwatch.png',
  'Wearables'
),
(
  'Quantum Portable Speaker', 
  89.99, 
  'Take your music anywhere with the Quantum Portable Speaker. Delivering powerful, immersive sound in a compact, waterproof design that fits in your bag.',
  JSON_ARRAY('Waterproof (IPX7 rated)', '12-hour battery life', 'Built-in microphone', 'Bluetooth 5.0', 'Multi-speaker pairing'),
  '/products/speaker.png',
  'Audio'
),
(
  'Infinity Wireless Earbuds', 
  129.99, 
  'Infinity Wireless Earbuds offer crystal-clear sound, seamless connectivity, and a comfortable fit. Perfect for workouts, commuting, or all-day wear.',
  JSON_ARRAY('Active Noise Cancellation', '8-hour single charge', 'Additional 24 hours with charging case', 'Touch controls', 'IPX5 sweat resistant'),
  '/products/earbuds.png',
  'Audio'
);
