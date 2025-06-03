import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ setToken, setUserRole, setRoleChecked }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/');
    setUserRole('');
    setRoleChecked(true);
  };

  return (
    <div className="p-5 bg-primary flex justify-between items-center shadow-md relative">
      <h1 className="text-secondary text-xl font-bold">Inzamam Amjad</h1>

      {/* Hamburger for mobile */}
      <button
        className="block md:hidden text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <nav className="flex gap-6 text-white font-medium">
          <a href="#profile" className="hover:text-tertiary transition">Profile</a>
          <a href="#about" className="hover:text-tertiary transition">About</a>
          <a href="#projects" className="hover:text-tertiary transition">Projects</a>
          <a href="#skills" className="hover:text-tertiary transition">Skills</a>
          <a href="#contact" className="hover:text-tertiary transition">Contact Me</a>
        </nav>
        <button
          onClick={handleLogout}
          className="ml-6 bg-white text-primary px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 w-48 bg-primary shadow-lg rounded-b z-50 flex flex-col items-start md:hidden animate-slide-down">
          <nav className="flex flex-col gap-3 text-white font-medium w-full px-4 py-3">
            <a href="#profile" className="hover:text-tertiary transition" onClick={() => setMenuOpen(false)}>Profile</a>
            <a href="#about" className="hover:text-tertiary transition" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#projects" className="hover:text-tertiary transition" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="#skills" className="hover:text-tertiary transition" onClick={() => setMenuOpen(false)}>Skills</a>
            <a href="#contact" className="hover:text-tertiary transition" onClick={() => setMenuOpen(false)}>Contact Me</a>
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="mt-3 bg-white text-primary px-4 py-2 rounded w-full"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;