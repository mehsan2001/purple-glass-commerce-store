
# PurpleGlass Backend API with Supabase

This is the backend API for the PurpleGlass e-commerce store using Supabase for database operations.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a Supabase project:
   - Go to [https://supabase.com](https://supabase.com) and create a new project
   - Copy your Supabase URL and API keys

3. Configure environment variables:
   - Create a `.env` file in the backend directory with the following:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   PORT=3001
   ```

4. Set up the database:
   - Copy the contents of `db/supabase-schema.sql`
   - Go to the SQL editor in your Supabase dashboard
   - Paste and run the SQL commands to create tables and sample data

5. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a specific order
- `PATCH /api/orders/:id/status` - Update order status

## Supabase Configuration

### Table Structure

The database consists of three main tables:

1. `products` - Stores product information
2. `orders` - Stores order information
3. `order_items` - Stores the items in each order

See `db/supabase-schema.sql` for the complete schema.

### Setting Up Row Level Security (Optional)

For added security, you can configure Row Level Security (RLS) in your Supabase project:

```sql
-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow anonymous read access to products" 
ON products FOR SELECT 
TO anon
USING (true);

-- Create more policies as needed for your app's security requirements
```

## Development

For local development:

1. Make sure you have a working Supabase project
2. Update the `.env` file with your Supabase credentials
3. Run `npm run dev` to start the development server with hot reloading
