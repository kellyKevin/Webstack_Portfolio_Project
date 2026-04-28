// LoginPage.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Firebase configuration file
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'; // Assuming you have the styles in this CSS file

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if a user is already logged in
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            alert('Login successful!');
            // Redirect to home page or another page
            navigate('/products');
        } catch (error) {
            setErrorMessage('Login failed: ' + error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="login-container">
            {!user ? (
                <>
                    <h1>Login</h1>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <div className="error-message">{errorMessage}</div>

                        <button type="submit">Login</button>
                    </form>
                    <div className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </>
            ) : (
                <>
                    <div className="user-info">
                        Logged in as: <span>{user.displayName || user.email}</span>
                    </div>
                    <div className="signout-button">
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginPage;
