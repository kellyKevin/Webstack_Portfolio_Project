import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import './styles.css'; // Import your CSS file

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
const auth = getAuth(app);

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsUserSignedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!isTermsAccepted) {
            setErrorMessage('Please agree to the Terms and Conditions.');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            alert('Sign up successful!');
            window.location.href = 'login.html'; // Redirect to login page
        } catch (error) {
            console.error('Error registering user:', error);
            setErrorMessage('Error registering user: ' + error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
            window.location.href = 'login.html'; // Redirect to login page after sign out
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const openTermsModal = () => {
        document.getElementById('termsModal').style.display = 'block';
    };

    const closeTermsModal = () => {
        document.getElementById('termsModal').style.display = 'none';
    };

    const agreeToTerms = () => {
        setIsTermsAccepted(true);
        closeTermsModal();
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSignup}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

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

                <div className="terms">
                    <input
                        type="checkbox"
                        id="termsCheckbox"
                        disabled
                        checked={isTermsAccepted}
                        onChange={() => setIsTermsAccepted(!isTermsAccepted)}
                    />
                    <label htmlFor="termsCheckbox">
                        I agree to the <a href="#" onClick={openTermsModal}>Terms and Conditions</a>
                    </label>
                </div>

                {errorMessage && <div className="error-message">{errorMessage}</div>}

                <button type="submit">Sign Up</button>
            </form>
            <div className="login-link">
                Already have an account? <a href="login">Login</a>
            </div>
            {isUserSignedIn && (
                <div className="signout-button">
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
            <div id="termsModal" className="modal">
                <div className="modal-content">
                    <h2>Terms and Conditions</h2>
                    <div className="terms-text">
                        <p>
                            Terms and Conditions for Using and Engaging with Ottawa seedlings
                        </p>
                        <p>
                            Welcome to Ottawa seedlings! We're delighted to have you visit and use our platform dedicated to
                            selling seedlings, plants such as avocado (Hass and Fuerte), passion fruit (yellow and purple), and
                            other varieties. Before you proceed, please read and understand the following terms and conditions
                            that govern your use of our website:
                        </p>
                        <p>
                            <strong>Acceptance of Terms:</strong> By accessing or using Ottawa seedlings, you agree to abide
                            by these terms and conditions, our Privacy Policy, and any other guidelines or rules applicable to
                            specific services or features which may be posted from time to time.
                        </p>
                        <p>
                            <strong>Use of Services:</strong> [Your Website Name] provides a platform for browsing, purchasing,
                            and learning about various seedlings and plants, including but not limited to avocado and passion
                            fruit. You agree to use the services provided on our website solely for lawful purposes and in
                            accordance with these terms.
                        </p>
                        <p>
                            <strong>Product Information:</strong> We strive to provide accurate and up-to-date information about
                            our products, including descriptions, prices, and availability. However, we do not warrant that such
                            information is error-free, complete, or current. Prices and availability are subject to change
                            without notice.
                        </p>
                        <p>
                            <strong>Orders and Payments:</strong>
                            <ul>
                                <li><strong>Order Placement:</strong> When you place an order through [Your Website Name], you are
                                    making an offer to purchase the products selected at the prices and terms stated.</li>
                                <li><strong>Payment:</strong> Payment is required at the time of placing your order unless otherwise
                                    agreed upon. We accept [List accepted payment methods].</li>
                                <li><strong>Cancellation:</strong> Orders may be canceled or modified before they are processed for
                                    shipment. Once shipped, orders cannot be canceled.</li>
                            </ul>
                        </p>
                        <p>
                            <strong>Shipping and Delivery:</strong>
                            <ul>
                                <li><strong>Shipping:</strong> We aim to ship orders promptly and use reasonable efforts to meet
                                    delivery estimates provided. However, delivery times may vary depending on factors beyond our
                                    control.</li>
                                <li><strong>Risk of Loss:</strong> Risk of loss and title for products purchased from Ottawa
                                    seedlings pass to you upon delivery to the carrier.</li>
                            </ul>
                        </p>
                        <p>
                            <strong>Returns and Refunds:</strong>
                            <ul>
                                <li><strong>Returns:</strong> We accept returns of unused and undamaged products within agreed
                                    days of delivery. Please refer to our Returns Policy for detailed instructions.</li>
                                <li><strong>Refunds:</strong> Refunds will be processed within [number] days after receiving the
                                    returned product, minus any applicable shipping charges.</li>
                            </ul>
                        </p>
                        <p>
                            <strong>Intellectual Property:</strong> All content and materials available on Ottawa seedlings,
                            including text, graphics, logos, images, and software, are the property of Ottawa seedlings or
                            its licensors and are protected by intellectual property laws.
                        </p>
                        <p>
                            <strong>Privacy:</strong> Your privacy is important to us. Please review our Privacy Policy to
                            understand how we collect, use, and disclose information about you.
                        </p>
                        <p>
                            <strong>Limitation of Liability:</strong> To the extent permitted by law, Ottawa seedlings shall
                            not be liable for any direct, indirect, incidental, special, or consequential damages arising out of
                            or in any way connected with the use of Ottawa seedlings or the purchase or use of any products
                            sold through Ottawa seedlings.
                        </p>
                        <p>
                            <strong>Governing Law:</strong> These terms and conditions shall be governed by and construed in
                            accordance with the laws of Kenya, without regard to its conflict of law provisions.
                        </p>
                        <p>
                            <strong>Changes to Terms:</strong> Ottawa seedlings reserves the right to update or modify these
                            terms and conditions at any time. Your continued use of the website constitutes acceptance of any
                            changes.
                        </p>
                        <button onClick={agreeToTerms}>I Agree</button>
                        <button onClick={closeTermsModal}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
