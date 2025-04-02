
import React from 'react';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { products } from '@/data/products';

const ProductsPage = () => {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">All Products</h1>
        <p className="text-gray-300">
          Browse our collection of premium tech products
        </p>
      </div>
      
      <ProductGrid products={products} />
    </Layout>
  );
};

export default ProductsPage;
