import React from 'react';

function Footer() {
  return (
    <footer className="bg-primary text-tertiary py-10 mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <div className="text-lg font-semibold">
          © {new Date().getFullYear()} Muhammad Inzamam Amjad
        </div>
      </div>
    </footer>
  );
}

export default Footer;
