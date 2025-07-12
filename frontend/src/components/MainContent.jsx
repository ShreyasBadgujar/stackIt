import React from 'react';

const MainContent = ({ children }) => (
  <main className="flex-1 lg:ml-64">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  </main>
);

export default MainContent;
