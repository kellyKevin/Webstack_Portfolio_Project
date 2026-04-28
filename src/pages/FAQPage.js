import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQPage.css';
import './styles.css';

const FAQPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeId, setActiveId] = useState(null);

    const faqs = [
        {
            id: 'question1',
            question: 'What payment methods do you accept?',
            answer: (
                <div className="faq-answer-content">
                    <p>We accept the following payment methods:</p>
                    <ul>
                        <li>Credit cards: Visa, MasterCard, American Express</li>
                        <li>PayPal</li>
                        <li>Mobile Payments (M-Pesa)</li>
                        <li>Bank transfers</li>
                    </ul>
                    <p>If you have any specific payment-related questions, feel free to <Link to="/contact">contact us</Link>.</p>
                </div>
            ),
        },
        {
            id: 'question2',
            question: 'How can I track my order?',
            answer: (
                <div className="faq-answer-content">
                    <p>Once your order has been processed and shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to:</p>
                    <ul>
                        <li>Check the status of your order on our website.</li>
                        <li>Track your package through our shipping carrier's website.</li>
                    </ul>
                    <p>If you haven't received a tracking number or need further assistance, please <Link to="/contact">contact our support team</Link>.</p>
                </div>
            ),
        },
        {
            id: 'question3',
            question: 'What is your return policy?',
            answer: (
                <div className="faq-answer-content">
                    <p>We offer a 30-day return policy for most items. Items must be returned:</p>
                    <ul>
                        <li>In their original condition.</li>
                        <li>With all tags attached.</li>
                    </ul>
                    <p>For detailed information, please check our returns policy page. This page outlines our policies regarding returns, refunds, and exchanges, ensuring clarity and transparency for our customers.</p>
                    <p>If you have questions about returning an item, please <Link to="/contact">contact our customer service</Link>.</p>
                </div>
            ),
        },
        {
            id: 'question4',
            question: 'Do you offer international shipping?',
            answer: (
                <div className="faq-answer-content">
                    <p>Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination. During checkout, you can view available shipping options for your location.</p>
                    <p>For more information about international shipping, please <Link to="/contact">contact us</Link>.</p>
                </div>
            ),
        },
        {
            id: 'question5',
            question: 'How do I contact customer support?',
            answer: (
                <div className="faq-answer-content">
                    <p>You can contact our customer support team through the following channels:</p>
                    <ul>
                        <li>Email: support@seedlings.com</li>
                        <li>Phone: +1-XXX-XXX-XXXX</li>
                        <li>Live Chat: Available on our website during business hours</li>
                    </ul>
                    <p>Our support team is available to assist you with any questions or concerns you may have.</p>
                </div>
            ),
        },
    ];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const toggleAnswer = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="page-container container">
            <h1 className="page-title">Frequently Asked Questions</h1>

            <div className="faq-search-container">
                <input 
                    type="text" 
                    className="faq-search-input"
                    value={searchQuery}
                    onChange={handleSearch} 
                    placeholder="Search for questions..."
                />
            </div>

            {searchQuery === '' && (
                <div className="faq-toc">
                    <strong>Table of Contents:</strong>
                    <ul className="faq-toc-list">
                        {faqs.map(faq => (
                            <li key={faq.id}>
                                <a href={`#${faq.id}`} className="faq-toc-link">{faq.question}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="faq-list">
                {filteredFaqs.map(faq => (
                    <div 
                        className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
                        key={faq.id}
                        id={faq.id}
                    >
                        <button
                            className="faq-question"
                            onClick={() => toggleAnswer(faq.id)}
                        >
                            {faq.question}
                        </button>
                        <div className="faq-answer">
                            {faq.answer}
                        </div>
                    </div>
                ))}
                {filteredFaqs.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        No questions found matching your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FAQPage;
