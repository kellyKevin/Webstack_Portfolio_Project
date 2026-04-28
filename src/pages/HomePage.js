import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Sow the Seeds of a Greener Future</h1>
          <p>Discover our premium selection of fruit trees, seedlings, and sustainable garden supplies.</p>
          <div className="hero-cta-group">
            <Link to="/products" className="btn-primary">Shop Collection</Link>
            <Link to="/education" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="home-features container">
        <header style={{ textAlign: 'center' }}>
          <h2>Why Choose Ottawa Seedlings?</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Quality you can trust, sustainability you can feel.</p>
        </header>

        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">🌿</span>
            <h3>Premium Quality</h3>
            <p>Our seedlings are nurtured with care to ensure high survival rates and bountiful harvests.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🚜</span>
            <h3>Sustainable Farming</h3>
            <p>We promote eco-friendly practices that protect the soil and provide healthy produce.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤝</span>
            <h3>Expert Support</h3>
            <p>Get personalized advice from our team of agronomists to help your garden thrive.</p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div style={{ background: 'var(--secondary-color)', padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', color: 'white' }}>
          <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Ready to start your garden?</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.9 }}>Join our community of growers today and get 10% off your first order.</p>
          <Link to="/signup" className="btn-primary" style={{ display: 'inline-block' }}>Get Started</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
