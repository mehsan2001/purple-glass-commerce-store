
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const Index = () => {
  // Show only 4 products on the homepage
  const featuredProducts = products.slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="glass rounded-xl p-8 mb-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Premium Tech Products with Style
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Discover our collection of high-quality audio devices and wearables designed to enhance your digital experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-purple hover:bg-purple-dark text-white">
                  <Link to="/products">Browse Products</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple to-orange/50 rounded-lg blur-xl opacity-75"></div>
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src="/products/headphones.png" 
                    alt="Featured Product" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-16">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Featured Products</h2>
            <Button asChild variant="link" className="text-purple-light">
              <Link to="/products">View all products</Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="glass rounded-xl p-8 mb-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose PurpleGlass</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-light/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Premium Quality</h3>
              <p className="text-gray-300">
                All our products are crafted with high-quality materials and advanced technology.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-light/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Fast Shipping</h3>
              <p className="text-gray-300">
                Enjoy quick delivery with our expedited shipping options worldwide.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-light/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">1-Year Warranty</h3>
              <p className="text-gray-300">
                Our products come with a full warranty and excellent customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple/30 to-orange/30 rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Elevate Your Tech Game?</h2>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers and experience our premium products today.
        </p>
        <Button asChild size="lg" className="bg-orange hover:bg-orange-dark text-white">
          <Link to="/products">Shop Now</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default Index;
