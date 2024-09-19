import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import './styles.css'; // Import CSS specific to this page

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBUZJDLktz7qBHUPj_XtPybxz3vkz5cYlQ",
    authDomain: "seedlingsweb-b6e5e.firebaseapp.com",
    projectId: "seedlingsweb-b6e5e",
    storageBucket: "seedlingsweb-b6e5e.appspot.com",
    messagingSenderId: "1042431917002",
    appId: "1:1042431917002:web:ebea14cb0326379967ed33",
    measurementId: "G-JVWHZPDJX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Contact = () => {
    const [reviews, setReviews] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

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

        const { name, email, message } = formData;

        try {
            await addDoc(collection(db, "reviews"), {
                name,
                email,
                message,
                timestamp: serverTimestamp()
            });
            alert('Review submitted successfully!');
            setFormData({ name: '', email: '', message: '' });
            fetchAndDisplayReviews();
        } catch (error) {
            console.error('Error adding review: ', error);
        }
    };

    const fetchAndDisplayReviews = async () => {
        try {
            const reviewsSnapshot = await getDocs(collection(db, 'reviews'));
            const reviewsList = reviewsSnapshot.docs.map(doc => doc.data());
            setReviews(reviewsList);
        } catch (error) {
            console.error('Error fetching reviews: ', error);
        }
    };

    return (
        <div className="contact-page">
            <h3><a href="/">Home Page</a></h3>

            <div className="contact-info">
                <h2>Contact Us</h2>
                <p>Have questions or need assistance? Reach out to us!</p>
                <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
                <p>Phone: +1 123 456 7890</p>
                <p>Address: 123 Main Street, City, Country</p>

                <h3>If you have any specific payment-related questions, feel free to contact us.</h3>
                <p>Our customer support team is available to assist you with any inquiries regarding payment methods and transactions.</p>

                <h3>If you haven't received a tracking number or need further assistance, please contact our support team.</h3>
                <p>If your order hasn't been updated with a tracking number or if you require additional assistance regarding order status and delivery, our support team is here to help.</p>

                <h3>If you have questions about returning an item, please contact our customer service.</h3>
                <p>For questions or issues related to returns, refunds, or exchanges, please reach out to our customer service team for assistance.</p>
            </div>

            <div className="contact-form">
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <button type="submit">Submit</button>
                </form>
            </div>

            <div className="reviews-container">
                <h2>Reviews</h2>
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <h3>{review.name}</h3>
                        <p><strong>Email:</strong> {review.email}</p>
                        <p>{review.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Contact;
