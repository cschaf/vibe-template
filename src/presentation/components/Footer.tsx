import React from 'react';

// No props needed for this simple footer for now
// interface FooterProps {}

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-700 text-white p-4 text-center h-12"> {/* h-12 for a fixed height if desired, adjust as needed */}
      <p>&copy; {new Date().getFullYear()} My Application. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
