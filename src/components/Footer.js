import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">Seedlings</div>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/products" className="footer-link">Products</Link>
          <Link to="/education" className="footer-link">Education</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Seedlings E-commerce Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
