import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  // toggleSidebar: () => void; // This might be handled by a close button inside or an overlay click
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`bg-green-600 text-white w-64 min-h-screen p-4 fixed top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:pt-16 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:top-16 md:min-h-0 md:h-[calc(100vh-4rem)] md:bottom-0`} // 4rem is header height (16 * 0.25rem = 4rem)
      aria-label="Sidebar"
    >
      <div className="pt-16 md:pt-0"> {/* Padding top for content to clear fixed header on mobile, not needed if sidebar is sticky below header */}
        <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-green-700">
                Navigation Link 1
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-green-700">
                Navigation Link 2
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="block p-2 rounded hover:bg-green-700">
                Navigation Link 3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
