// src/pages/ProductsPage.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../firebase';
import { useCart } from '../context/CartContext';
import './Productspage.css';

const ProductsPage = () => {
    const { addToCart, removeFromCart, showToast } = useCart();
    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('fruits ');
    const [modalData, setModalData] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const fetchData = async (category) => {
        setLoading(true);
        setActiveCategory(category);
        try {
            const querySnapshot = await getDocs(collection(db, category));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(data);

            const initialQuantities = {};
            data.forEach(p => {
                initialQuantities[p.id] = 1;
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error(`Error fetching data from ${category}:`, error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData('fruits ');
    }, []);

    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, parseInt(value, 10) || 1)
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        addToCart({
            id: product.id,
            name: product.id,
            price: parseFloat(product.price) || 0,
            image: product.imagetree1
        }, quantity);
        showToast(`Added ${quantity} ${product.id} to cart!`);
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        showToast("Removed from cart");
    };

    const openModal = (product) => {
        setModalData({
            title: product.id,
            images: [product.imagetree1, product.imagetree2, product.imagetree3].filter(Boolean)
        });
    };

    return (
        <div className="products-page container">
            <header className="products-header">
                <h1>Our Collection</h1>
                <p>Sustainable seedlings for a greener future</p>
            </header>

            <nav className="category-nav">
                {[
                    { id: 'fruits ', label: 'Fruits' },
                    { id: 'trees', label: 'Trees' },
                    { id: 'veges', label: 'Vegetables' }
                ].map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => fetchData(cat.id)}
                    >
                        {cat.label}
                    </button>
                ))}
            </nav>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem' }}>Loading products...</div>
            ) : (
                <div className="products-grid">
                    {products.map(product => (
                        <article key={product.id} className="product-card">
                            <div className="product-image-wrapper" onClick={() => openModal(product)}>
                                <img
                                    src={product.imagetree1 || 'placeholder.jpg'}
                                    alt={product.Description || product.id}
                                />
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.id}</h3>
                                <p className="product-desc">{product.Description || 'No description available'}</p>
                                <div className="product-footer">
                                    <span className="product-price">
                                        ksh {(parseFloat(product.price) || 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="product-actions">
                                    <input
                                        type="number"
                                        min="1"
                                        className="quantity-input"
                                        value={quantities[product.id] || 1}
                                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    />
                                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </button>
                                </div>
                                <button
                                    className="remove-entirely-btn"
                                    onClick={() => handleRemoveFromCart(product.id)}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {modalData && (
                <div className="modal-overlay" onClick={() => setModalData(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <span className="modal-close" onClick={() => setModalData(null)}>&times;</span>
                        <h2>{modalData.title}</h2>
                        <div className="modal-images-grid">
                            {modalData.images.map((img, index) => (
                                <img key={index} src={img} alt={`${modalData.title} view ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
