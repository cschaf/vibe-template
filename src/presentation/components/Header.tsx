import React from 'react';

interface HeaderProps {
  // Future props like title could be added here
  onToggleSidebar: () => void; // Callback to toggle sidebar
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="bg-orange-400 text-gray-800 p-4 fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
      {/* Hamburger Menu Button - visible on small screens */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden mr-4 p-2 rounded hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-label="Toggle sidebar"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <h1 className="text-xl font-semibold">My Application</h1>
      {/* Other header content like user profile, notifications can go here */}
    </header>
  );
};

export default Header;
