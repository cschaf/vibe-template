import React from 'react';
import Layout from './components/Layout';
// Ensure your global CSS with Tailwind directives is imported here or in index.tsx
// For example: import './index.css';

const App: React.FC = () => {
  return (
    <Layout>
      {/* Content for the main area goes here */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">Dashboard</h2>
        <p className="text-gray-600">
          Welcome to your application dashboard. This is where your main content will be displayed.
          You can add any components or elements here.
        </p>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Sample Card</h3>
          <p className="text-gray-600">This is a sample card within the main content area.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Another Card</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        {/* Example of longer content to test scrolling */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Longer Content Section</h3>
          {Array.from({ length: 15 }).map((_, index) => (
            <p key={index} className="text-gray-600 mb-2">
              This is paragraph number {index + 1} to demonstrate scrolling behavior within the main content area.
              The sidebar should remain sticky or overlayed, and the header/footer fixed.
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default App;
