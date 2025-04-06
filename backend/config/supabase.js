
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
const supabaseUrl = process.env.SUPABASE_URL || "https://fesxikwxswxnyqemhtfa.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  console.error('Using URL:', supabaseUrl);
  console.error('Key available:', supabaseKey ? 'Yes' : 'No');
  process.exit(1);
}

console.log('Initializing Supabase client with URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey);

// Add a quick test to verify connectivity
(async () => {
  try {
    // Test connection by trying to access the products table
    const { data, error } = await supabase.from('purpleglass_products').select('count');
    
    if (error) {
      console.error("Error connecting to Supabase:", error);
      
      // Check if purpleglass_orders table exists
      console.log("Checking if orders table exists...");
      
      try {
        const { data: ordersData, error: ordersError } = await supabase
          .from('purpleglass_orders')
          .select('count');
          
        if (ordersError) {
          console.error("Error accessing orders table:", ordersError);
          console.error("Please check that the purpleglass_orders table exists in your Supabase project");
        } else {
          console.log("Successfully connected to orders table. Count:", ordersData);
        }
      } catch (err) {
        console.error("Could not check orders table:", err);
      }
    } else {
      console.log("Successfully connected to Supabase. Products count:", data);
    }
  } catch (e) {
    console.error("Failed to test Supabase connection:", e);
  }
})();

module.exports = supabase;
