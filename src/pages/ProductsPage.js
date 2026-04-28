// src/pages/Productspage.js

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useCart } from '../context/CartContext';
import './Productspage.css';

const Productspage = () => {
    const { addToCart, removeFromCart } = useCart();
    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [modalImages, setModalImages] = useState([]);
    const [modalTitle, setModalTitle] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantities, setQuantities] = useState({});
    
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const fetchData = async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(data);

            // Initialize quantities for new products
            const initialQuantities = {};
            data.forEach(p => {
                initialQuantities[p.id] = 1;
            });
            setQuantities(initialQuantities);
        } catch (error) {
            console.error(`Error fetching data from ${collectionName}:`, error);
        }
    };

    const handleQuantityChange = (productId, value) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: parseInt(value, 10) || 1
        }));
    };

    const handleAddToCart = (product) => {
        if (!currentUser) {
            alert("Please log in to add items to your cart.");
            return;
        }
        const quantity = quantities[product.id] || 1;
        addToCart({
            id: product.id,
            name: product.id, // Using ID as name since it's displayed as title
            price: parseFloat(product.price) || 0,
            image: product.imagetree1
        }, quantity);
        alert(`${quantity} added to cart.`);
    };

    const showModal = (images, title) => {
        setModalImages(images);
        setModalTitle(title);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchData('fruits');
    }, []);

    return (
        <div>
            <div className="selector">
                <h1><button onClick={() => navigate('/cart')}>View Cart</button></h1>
                <h2>
                    <label htmlFor="collection-select">Choose a collection:</label>
                    <select id="collection-select" onChange={(e) => fetchData(e.target.value)}>
                        <option value="fruits">Fruits</option>
                        <option value="trees">Trees</option>
                        <option value="veges">Vegetables</option>
                    </select>
                    <button onClick={() => fetchData(document.getElementById('collection-select').value)}>Fetch Data</button>
                </h2>
            </div>

            <div className="container" id="data-container">
                {products.map(product => (
                    <div key={product.id} className="card">
                        <img
                            src={product.imagetree1 || 'placeholder.jpg'}
                            alt={product.Description || 'No description available'}
                            onClick={() => showModal([product.imagetree1, product.imagetree2, product.imagetree3], product.id)}
                        />
                        <div className="card-title">{product.id}</div>
                        <div className="card-desc">{product.Description || 'No description available'}</div>
                        <div className="card-price">
                            ksh{(parseFloat(product.price) || 0).toFixed(2)}
                        </div>
                        <div className="quantity-selector">
                            <input
                                type="number"
                                min="1"
                                value={quantities[product.id] || 1}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            />
                        </div>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        <button onClick={() => removeFromCart(product.id)} className="remove-btn">Remove Entirely</button>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div id="imageModal" className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div id="modal-images">
                            {modalImages.map((img, index) => (
                                <img key={index} src={img || 'placeholder.jpg'} alt={`${modalTitle} view ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productspage;
