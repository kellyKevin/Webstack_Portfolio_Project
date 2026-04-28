import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import './styles.css';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isTermsAccepted) {
            setErrorMessage('Please agree to the Terms and Conditions.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            navigate('/');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="page-container container">
            <div className="card-container auth-form">
                <h1>Create Account</h1>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            id="termsCheckbox"
                            checked={isTermsAccepted}
                            onChange={(e) => setIsTermsAccepted(e.target.checked)}
                        />
                        <label htmlFor="termsCheckbox" style={{ marginBottom: 0 }}>
                            I agree to the <button type="button" className="link-button" onClick={() => setIsTermsModalOpen(true)}>Terms and Conditions</button>
                        </label>
                    </div>

                    <button type="submit" className="btn-auth">Sign Up</button>
                </form>
                <div className="auth-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>

            {isTermsModalOpen && (
                <div className="modal-overlay" onClick={() => setIsTermsModalOpen(false)}>
                    <div className="terms-modal" onClick={e => e.stopPropagation()}>
                        <h2>Terms and Conditions</h2>
                        <div className="terms-content">
                            <p>Welcome to Ottawa Seedlings! By using our platform, you agree to our terms of service...</p>
                            <p><strong>Use of Services:</strong> You agree to use the services provided on our website solely for lawful purposes.</p>
                            <p><strong>Product Information:</strong> We strive for accuracy but do not warrant that product descriptions are error-free.</p>
                            {/* Shortened for brevity in this step */}
                        </div>
                        <button className="btn-auth" onClick={() => { setIsTermsAccepted(true); setIsTermsModalOpen(false); }}>
                            I Agree
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUpPage;
