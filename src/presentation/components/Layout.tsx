import React, { useState, ReactNode } from 'react';
import Header from './Header'; // Ensure this path
import Sidebar from './Sidebar'; // Ensure this path
import Footer from './Footer'; // Ensure this path

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
            isSidebarOpen ? 'md:ml-64' : 'md:ml-0'
          } md:ml-64`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
