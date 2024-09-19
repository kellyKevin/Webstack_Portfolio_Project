// src/pages/Productspage.js

import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './Productspage.css'; // Assuming you have the CSS in a file named Productspage.css

// Firebase configuration
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
const auth = getAuth(app);

const Productspage = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [currentUser, setCurrentUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [modalImages, setModalImages] = useState([]);
    const [cartModalOpen, setCartModalOpen] = useState(false);

    useEffect(() => {
        // Check auth state
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Fetch data from Firestore
    const fetchData = async (collectionName) => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(data);
        } catch (error) {
            console.error(`Error fetching data from ${collectionName}:`, error);
        }
    };

    // Handle adding item to cart
    const addToCart = async (itemId, itemName, itemPrice, itemImage) => {
        if (!currentUser) {
            alert("Please log in to add items to your cart.");
            return;
        }

        const quantityToAdd = prompt(`Enter quantity to add for ${itemName}:`, '1');
        if (quantityToAdd === null || quantityToAdd === '') {
            return;
        }
        const parsedQuantity = parseInt(quantityToAdd, 10);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            alert("Invalid quantity. Please enter a valid number greater than zero.");
            return;
        }

        const item = {
            id: itemId,
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: parsedQuantity,
            addedBy: currentUser.email
        };

        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(i => i.id === itemId);
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += parsedQuantity;
        } else {
            updatedCart.push(item);
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        try {
            const cartItems = updatedCart.map(cartItem => ({
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                image: cartItem.image,
                quantity: cartItem.quantity,
                addedBy: cartItem.addedBy
            }));

            await setDoc(doc(db, "carts", currentUser.uid), { items: cartItems });
            alert(`${parsedQuantity} ${parsedQuantity > 1 ? 'items' : 'item'} added to cart for user: ${currentUser.email}`);
        } catch (error) {
            console.error("Error updating cart in Firestore:", error);
        }
    };

    // Handle removing item from cart
    const removeFromCart = async (itemId) => {
        if (!currentUser) {
            alert("Please log in to modify your cart.");
            return;
        }

        const updatedCart = cart.filter(item => item.id !== itemId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        try {
            const cartItems = updatedCart.map(cartItem => ({
                id: cartItem.id,
                name: cartItem.name,
                price: cartItem.price,
                image: cartItem.image,
                quantity: cartItem.quantity,
                addedBy: cartItem.addedBy
            }));

            await setDoc(doc(db, "carts", currentUser.uid), { items: cartItems });
            alert(`Item removed from cart for user: ${currentUser.email}`);
        } catch (error) {
            console.error("Error removing item from Firestore cart:", error);
        }
    };

    // Handle modal display
    const showModal = (images) => {
        setModalImages(images);
        document.getElementById('imageModal').style.display = 'block';
    };

    const closeModal = () => {
        document.getElementById('imageModal').style.display = 'none';
    };

    const openCartModal = () => {
        setCartModalOpen(true);
    };

    const closeCartModal = () => {
        setCartModalOpen(false);
    };

    // Fetch initial data
    useEffect(() => {
        fetchData('fruits ');
    }, []);

    return (
        <div>
            <div className="selector">
                <h3><a href="/">Home Page</a></h3>
                <h1><a href="/cart">View Cart</a></h1>
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
                            onClick={() => showModal([product.imagetree1, product.imagetree2, product.imagetree3])}
                        />
                        <div className="card-title">{product.id}</div>
                        <div className="card-desc">{product.Description || 'No description available'}</div>
                        <button onClick={() => removeFromCart(product.id)}>Remove</button>
                        <div className="card-price">
                            ksh{(parseFloat(product.price) || 0).toFixed(2)}
                        </div>
                        <button onClick={() => addToCart(product.id, product.id, parseFloat(product.price) || 0, product.imagetree1)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            <div id="cartModal" className={`modal ${cartModalOpen ? 'active' : ''}`}>
                <div className="modal-content">
                    <span className="close" onClick={closeCartModal}>&times;</span>
                    <h3>Shopping Cart</h3>
                    <div id="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>Price: ksh{(parseFloat(item.price) || 0).toFixed(2)} | Quantity: {item.quantity}</p>
                                </div>
                                <div className="quantity">
                                    <button className="btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        Total: ksh{cart.reduce((total, item) => total + (parseFloat(item.price) || 0) * item.quantity, 0).toFixed(2)}
                    </div>
                </div>
            </div>

            <div id="imageModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div id="modal-images">
                        {modalImages.map((img, index) => (
                            <img key={index} src={img || 'placeholder.jpg'} alt={`Image ${index + 1}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Productspage;
