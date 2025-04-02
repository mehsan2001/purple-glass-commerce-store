
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="glass rounded-lg p-12 text-center max-w-lg mx-auto">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-purple hover:bg-purple-dark text-white">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
