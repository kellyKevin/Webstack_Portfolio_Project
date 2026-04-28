import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Toast from '../components/Toast/Toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [user, setUser] = useState(null);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Sync from Firestore when user logs in
                const cartDoc = await getDoc(doc(db, 'carts', currentUser.uid));
                if (cartDoc.exists()) {
                    const firestoreCart = cartDoc.data().items || [];
                    setCart(firestoreCart);
                    localStorage.setItem('cart', JSON.stringify(firestoreCart));
                }
            } else {
                // Clear cart state on logout (or keep it if you want guest cart)
                setCart([]);
                localStorage.removeItem('cart');
            }
        });
        return () => unsubscribe();
    }, []);

    const saveCart = async (newCart, currentUser) => {
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        if (currentUser) {
            try {
                await setDoc(doc(db, 'carts', currentUser.uid), { items: newCart });
            } catch (error) {
                console.error("Error saving cart to Firestore:", error);
            }
        }
    };

    const addToCart = (product, quantity) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({ ...product, quantity });
        }
        saveCart(updatedCart, user);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCart(updatedCart, user);
    };

    const updateQuantity = (productId, quantity) => {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        saveCart(updatedCart, user);
    };

    const clearCart = () => {
        saveCart([], user);
    };

    const showToast = (message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, showToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </CartContext.Provider>
    );
};
