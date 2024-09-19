import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import your CSS file

const HomePage = () => {
  return (
    <div>
      <a className="skip-to-content" href="#content">Skip to Content</a>

      <div className="hero">
        <h1>Welcome to Ottawa Seedlings</h1>
        <h2>Garden Centre</h2>
        <div className="buttons">
          <a href="https://www.google.com/maps/place/Your+Location+Here" target="_blank" rel="noopener noreferrer">Get Directions</a>
        </div>
        <h3><Link to="/signup">Log-in/Sign-in</Link></h3>
      </div>
      
      <section id="content" className="content">
        <h2>Our Products</h2>
        <p>Explore a wide range of plants, gardening tools, and supplies at our garden centre. We offer quality products to help you create and maintain a beautiful garden.</p>
        <p>Include more details about specific product categories, seasonal offers, or featured items to engage visitors.</p>
      </section>


    </div>
  );
};

export default HomePage;
