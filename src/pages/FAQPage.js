// src/components/FAQPage.js

import React, { useState } from 'react';
import './FAQPage.css'; // Ensure this path is correct

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            id: 'question1',
            question: 'What payment methods do you accept?',
            answer: (
                <>
                    <p>We accept the following payment methods:</p>
                    <ul>
                        <li>Credit cards: Visa, MasterCard, American Express</li>
                        <li>PayPal</li>
                        <li>Bank transfers</li>
                    </ul>
                    <p>If you have any specific payment-related questions, feel free to <a href="contact.html">contact us</a>.</p>
                </>
            ),
        },
        {
            id: 'question2',
            question: 'How can I track my order?',
            answer: (
                <>
                    <p>Once your order has been processed and shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to:</p>
                    <ul>
                        <li>Check the status of your order on our website.</li>
                        <li>Track your package through our shipping carrier's website.</li>
                    </ul>
                    <p>If you haven't received a tracking number or need further assistance, please <a href="contact.html">contact our support team</a>.</p>
                </>
            ),
        },
        {
            id: 'question3',
            question: 'What is your return policy?',
            answer: (
                <>
                    <p>We offer a 30-day return policy for most items. Items must be returned:</p>
                    <ul>
                        <li>In their original condition.</li>
                        <li>With all tags attached.</li>
                    </ul>
                    <p>For detailed information, please check our <a href="returns.html" target="_blank">returns policy page</a>. This page outlines our policies regarding returns, refunds, and exchanges, ensuring clarity and transparency for our customers.</p>
                    <p>If you have questions about returning an item, please <a href="contact.html">contact our customer service</a>.</p>
                </>
            ),
        },
        {
            id: 'question4',
            question: 'Do you offer international shipping?',
            answer: (
                <>
                    <p>Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination. During checkout, you can view available shipping options for your location.</p>
                    <p>For more information about international shipping, please <a href="contact.html">contact us</a>.</p>
                </>
            ),
        },
        {
            id: 'question5',
            question: 'How do I contact customer support?',
            answer: (
                <>
                    <p>You can contact our customer support team through the following channels:</p>
                    <ul>
                        <li>Email: support@yourwebsite.com</li>
                        <li>Phone: +1-XXX-XXX-XXXX</li>
                        <li>Live Chat: Available on our website during business hours</li>
                    </ul>
                    <p>Our support team is available to assist you with any questions or concerns you may have.</p>
                </>
            ),
        },
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const toggleAnswer = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('active');
        }
    };

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    id="searchInput" 
                    value={searchQuery}
                    onChange={handleSearch} 
                    placeholder="Search for questions..."
                />
            </div>

            <h3><a href="index.html">Home Page</a></h3>

            <h1 style={{ textAlign: 'center' }}>Frequently Asked Questions</h1>

            <div className="toc">
                <strong>Table of Contents:</strong>
                <ul id="tableOfContents">
                    {faqs.filter(faq => faq.question.toLowerCase().includes(searchQuery)).map(faq => (
                        <li key={faq.id}>
                            <a href={`#${faq.id}`}>{faq.question}</a>
                        </li>
                    ))}
                </ul>
            </div>

            {faqs.map(faq => (
                <div className="faq-section" key={faq.id}>
                    <div 
                        className="question" 
                        id={faq.id} 
                        onClick={() => toggleAnswer(`answer${faq.id}`)}
                    >
                        {faq.question}
                    </div>
                    <div className="answer" id={`answer${faq.id}`}>
                        {faq.answer}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQPage;
