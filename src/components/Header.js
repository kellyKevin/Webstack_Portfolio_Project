import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';  // Import CSS for the Header component

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
          <li><NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>FAQ</NavLink></li>
          <li><NavLink to="/education" className={({ isActive }) => isActive ? 'active' : ''}>Education</NavLink></li>
          <li><NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
