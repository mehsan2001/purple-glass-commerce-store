
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition">
      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-light to-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-80 flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
        </div>
      </div>
      <span className="text-2xl font-bold text-white">PurpleGlass</span>
    </Link>
  );
};

export default Logo;
