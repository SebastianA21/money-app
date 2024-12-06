// src/components/Header.tsx

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md dark:bg-gray-900">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-semibold">Money Exchange</h1>
      </div>
    </header>
  );
};

export default Header;
