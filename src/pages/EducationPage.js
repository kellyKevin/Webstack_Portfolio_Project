import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const EducationPage = () => {
    return (
        <div className="education-page">
            <h3><Link to="/">Home Page</Link></h3>
            <h1>Educational Resources</h1>

            <section className="section">
                <h2>Gardening Tips for Beginners</h2>
                <p>Starting a garden can be one of the most rewarding things you do. Here are some basic tips to get you started:</p>
                <ul>
                    <li><strong>Choose the right location:</strong> Most plants need at least 6 hours of sunlight.</li>
                    <li><strong>Plan your layout:</strong> Consider how much space each plant will need when full grown.</li>
                    <li><strong>Start with good soil:</strong> Invest in high-quality compost or topsoil.</li>
                    <li><strong>Water wisely:</strong> It's better to water deeply once or twice a week than shallowly every day.</li>
                </ul>
            </section>

            <section className="section">
                <h2>Seedling Care Guide</h2>
                <p>Your seedlings need special attention to grow into healthy plants:</p>
                <ul>
                    <li><strong>Keep them moist:</strong> Use a spray bottle to avoid washing away the delicate soil.</li>
                    <li><strong>Provide plenty of light:</strong> If growing indoors, use a grow light or place them in a south-facing window.</li>
                    <li><strong>Hardening off:</strong> Gradually expose your seedlings to outdoor conditions before transplanting them into the garden.</li>
                    <li><strong>Thinning:</strong> If multiple seeds sprout in one container, remove the weaker ones to give the strongest seedling room to grow.</li>
                </ul>
            </section>

            <section className="section">
                <h2>Seasonal Planting Guide</h2>
                <p>Understanding when to plant is key to a successful harvest:</p>
                <p>Coming soon! We are working on a detailed calendar for your specific region.</p>
            </section>
        </div>
    );
};

export default EducationPage;
