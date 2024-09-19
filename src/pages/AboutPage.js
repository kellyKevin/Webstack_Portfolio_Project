import React from 'react';
import './styles.css'; // Import CSS specific to this page

const AboutPage = () => {
    return (
        <div className="about-page">
            <h3><a href="/">Home Page</a></h3>
            <h1>About Us</h1>

            <div className="section">
                <h2>Our Seedlings Webpage</h2>
                <p>Welcome to our Seedlings Webpage, where we are passionate about promoting sustainable agriculture through the distribution of high-quality seedlings. We aim to empower farmers and gardening enthusiasts alike by providing robust, healthy seedlings that contribute to bountiful harvests and vibrant gardens.</p>
                <p>At Seedlings Webpage, we offer a diverse range of seedlings, including vegetables, fruits, herbs, and ornamentals. Each seedling is carefully nurtured from premium seeds to ensure superior quality and vitality.</p>
            </div>

            {/* Uncomment and update the image sources if you have images */}
            {/* 
            <div className="section visual-elements">
                <h2>Gallery</h2>
                <img src="images/seedlings.jpg" alt="Seedlings" />
                <img src="images/team.jpg" alt="Our Team" />
                <img src="images/facilities.jpg" alt="Our Facilities" />
            </div>
            */}

            <div className="section">
                <h2>Our Organization</h2>
                <p>Seedlings Webpage is dedicated to fostering environmental stewardship and community resilience through sustainable agricultural practices. We collaborate with local farmers and nurseries to source our seedlings, supporting local economies and promoting biodiversity.</p>
                <p>Our team comprises passionate individuals with expertise in horticulture, agriculture, and environmental science. Together, we strive to make quality seedlings accessible to everyone, from small-scale gardeners to large-scale agricultural enterprises.</p>
            </div>

            <div className="section">
                <h2>Our Mission</h2>
                <p>Our mission at Seedlings Webpage is to empower individuals and communities to grow their own food sustainably. We believe in the transformative power of gardening and agriculture to improve food security, promote healthier lifestyles, and protect our planet.</p>
            </div>

            <div className="section">
                <h2>Our History</h2>
                <p>Founded in 2010, Seedlings Webpage began as a small community project aimed at providing local farmers with quality seedlings. Over the years, we have grown into a trusted name in sustainable agriculture, expanding our reach and impact. Our commitment to quality and sustainability has been the cornerstone of our success.</p>
            </div>

            <div className="section">
                <h2>Meet Our Team</h2>
                <p>Our team is made up of experienced horticulturists, dedicated farmers, and passionate environmentalists who share a common goal of promoting sustainable agriculture. Each team member brings a wealth of knowledge and expertise, ensuring that every seedling we provide is of the highest quality.</p>
            </div>

            <div className="section testimonials">
                <h2>What Our Customers Say</h2>
                <div className="testimonial">
                    <p>"The seedlings I purchased from Seedlings Webpage have transformed my garden. The quality is unmatched, and the support team is incredibly helpful."</p>
                    <p className="author">- Jane Doe, Home Gardener</p>
                </div>
                <div className="testimonial">
                    <p>"As a small-scale farmer, finding reliable sources for quality seedlings is crucial. Seedlings Webpage has consistently provided top-notch plants that thrive in our local conditions."</p>
                    <p className="author">- John Smith, Farmer</p>
                </div>
                <div className="testimonial">
                    <p>"I love the variety of seedlings available. It allows me to experiment with different crops and expand my garden. Highly recommended!"</p>
                    <p className="author">- Sarah Johnson, Gardening Enthusiast</p>
                </div>
            </div>

            <div className="section">
                <h2>Contact Us</h2>
                <p>If you have any questions about Seedlings Webpage or would like to learn more about our seedlings and services, please don't hesitate to contact us:</p>
                <div className="contact-info">
                    <p>Email: <a href="mailto:info@seedlingswebpage.com">info@seedlingswebpage.com</a></p>
                    <p>Phone: +1 123 456 7890</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
