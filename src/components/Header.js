import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="header">
      <nav className="container">
        <ul>
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>Products</NavLink></li>
          <li><NavLink to="/education" className={({ isActive }) => isActive ? 'active' : ''}>Education</NavLink></li>
          <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink></li>
          <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink></li>
          <li><NavLink to="/faq" className={({ isActive }) => isActive ? 'active' : ''}>FAQ</NavLink></li>
          <li><NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink></li>
          <li className="cart-icon-container">
            <Link to="/cart">
              🛒
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
