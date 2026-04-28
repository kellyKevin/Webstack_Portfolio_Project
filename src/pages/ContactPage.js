import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import './styles.css';

const Contact = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchAndDisplayReviews();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { name, email, message } = formData;

        try {
            await addDoc(collection(db, "reviews"), {
                name,
                email,
                message,
                timestamp: serverTimestamp()
            });
            alert('Thank you! Your review has been submitted.');
            setFormData({ name: '', email: '', message: '' });
            fetchAndDisplayReviews();
        } catch (error) {
            console.error('Error adding review: ', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchAndDisplayReviews = async () => {
        try {
            const q = query(collection(db, 'reviews'), orderBy('timestamp', 'desc'), limit(10));
            const reviewsSnapshot = await getDocs(q);
            const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
            setReviews(reviewsList);
        } catch (error) {
            console.error('Error fetching reviews: ', error);
        }
    };

    return (
        <div className="page-container container">
            <h1 className="page-title">Contact Us</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <section className="content-section text-content">
                    <h2>Get in Touch</h2>
                    <p>Have questions about our seedlings or need gardening advice? We're here to help!</p>

                    <div style={{ marginTop: '1.5rem' }}>
                        <p><strong>Email:</strong> <a href="mailto:info@seedlings.com">info@seedlings.com</a></p>
                        <p><strong>Phone:</strong> +1 123 456 7890</p>
                        <p><strong>Address:</strong> 123 Green Lane, Eco City, Earth</p>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <h3>Support Hours</h3>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                    </div>
                </section>

                <section className="card-container auth-form" style={{ maxWidth: 'none', margin: 0 }}>
                    <h2>Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                className="form-input"
                                style={{ minHeight: '120px', resize: 'vertical' }}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-auth" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </section>
            </div>

            <section className="content-section" style={{ marginTop: '4rem' }}>
                <h2>Recent Community Reviews</h2>
                <div className="testimonial-grid">
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                            <div key={index} className="testimonial-card">
                                <p className="testimonial-text">"{review.message}"</p>
                                <p className="testimonial-author">− {review.name}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first to share your experience!</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Contact;
