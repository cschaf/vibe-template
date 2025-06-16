import React, { useState, ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16"> {/* pt-16 to offset for fixed header height */}
        <Sidebar isOpen={isSidebarOpen} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'md:ml-64' : 'md:ml-0' // Only apply margin on md+ screens if sidebar is of fixed type
          } md:ml-64`} // Default margin for desktop when sidebar is always shown
        >
          {children}
        </main>
      </div>
      {/* Footer can be placed here if it's part of the scrolling content
          or outside .flex.flex-1 if it needs to be sticky at the bottom
          (would require body to be flex-col too)
          For simplicity, let's assume a standard footer at the end of content.
          If footer needs to be always at bottom of viewport, even if content is short:
          The parent div of Layout (e.g. in App.tsx) should be `flex flex-col min-h-screen`.
          The `div.flex.flex-1.pt-16` would ensure this middle section takes available space.
          The current setup with `min-h-screen` on the root div of Layout and `flex-1` on the container
          should achieve this.
      */}
      <Footer />
    </div>
  );
};

export default Layout;
