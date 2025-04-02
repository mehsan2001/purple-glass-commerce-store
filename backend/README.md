
# PurpleGlass Backend API

This is the backend API for the PurpleGlass e-commerce store. It provides endpoints for product and order management.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the values with your Hostinger MySQL credentials

3. Set up the database:
   - Create a database in your Hostinger MySQL panel
   - Run the SQL commands from `db/schema.sql` to create tables and sample data

4. Start the server:
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

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get a specific order
- `PATCH /api/orders/:id/status` - Update order status

## Deployment to Hostinger

1. Upload the backend code to your Hostinger hosting account
2. Configure environment variables in Hostinger environment or create a `.env` file
3. Install dependencies using SSH or Hostinger's terminal
4. Set up a process manager like PM2 to keep the Node.js application running
5. Configure Hostinger to direct API requests to your Node.js application

## Development

For local development:

1. Make sure you have MySQL installed locally or use a remote MySQL connection
2. Update the `.env` file with your database credentials
3. Run `npm run dev` to start the development server with hot reloading
