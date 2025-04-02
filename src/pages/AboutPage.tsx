
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">About PurpleGlass</h1>
        
        <div className="glass mb-12 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
          <p className="text-gray-300 mb-4">
            PurpleGlass was founded in 2023 with a simple mission: to create premium tech products with an emphasis on style, quality, and user experience. We believe that technology should not only be functional but also beautiful.
          </p>
          <p className="text-gray-300 mb-4">
            Our team of designers and engineers work tirelessly to create products that stand out in both form and function. We source the highest quality materials and components to ensure that every product meets our exacting standards.
          </p>
          <p className="text-gray-300">
            What started as a small passion project has quickly grown into a beloved brand trusted by thousands of customers worldwide. We're proud of our journey and excited about the future as we continue to expand our product line and reach new customers.
          </p>
        </div>
        
        <div className="glass mb-12 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="h-12 w-12 rounded-full bg-purple-light/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality</h3>
              <p className="text-gray-300">
                We never compromise on quality. Every product undergoes rigorous testing before reaching our customers.
              </p>
            </div>
            
            <div>
              <div className="h-12 w-12 rounded-full bg-purple-light/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Design</h3>
              <p className="text-gray-300">
                We believe that good design is as important as good functionality. Our products are beautiful objects you'll be proud to own.
              </p>
            </div>
            
            <div>
              <div className="h-12 w-12 rounded-full bg-purple-light/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
              <p className="text-gray-300">
                We're always looking for ways to push the boundaries of what's possible, creating products that surprise and delight.
              </p>
            </div>
          </div>
        </div>
        
        <div className="glass mb-12 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-purple-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Alex Thompson</h3>
                <p className="text-purple-light">Founder & CEO</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-purple-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Sam Rivera</h3>
                <p className="text-purple-light">Head of Design</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-purple-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Jamie Chen</h3>
                <p className="text-purple-light">Lead Engineer</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-purple-light/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Morgan Lee</h3>
                <p className="text-purple-light">Head of Customer Experience</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">Join Our Journey</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            We're always looking for talented individuals who share our passion for great design and technology. If that sounds like you, we'd love to hear from you.
          </p>
          <a 
            href="/contact" 
            className="inline-block px-6 py-3 rounded-md bg-purple hover:bg-purple-dark text-white transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
