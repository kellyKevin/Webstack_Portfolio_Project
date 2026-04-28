import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import EducationPage from './pages/EducationPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage'; // Import CartPage

// Lazy load the SignUpPage for better performance
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));

// Loading Spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading...........</p>
  </div>
);

// Smooth Scroll to Top on Route Change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ element, user, loading }) => {
  if (loading) return <div>Loading Auth...</div>;
  return user ? element : <Navigate to="/login" />;
};

// Main App Component
const App = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Simulate loading state for route transitions
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleEnd = () => setLoading(false);
    window.addEventListener('load', handleEnd);
    window.addEventListener('beforeunload', handleStart);

    return () => {
      window.removeEventListener('load', handleEnd);
      window.removeEventListener('beforeunload', handleStart);
    };
  }, []);

  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Suspense fallback={<LoadingSpinner />}>
              {loading && <LoadingSpinner />}
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} /> {/* Added CartPage route */}

                {/* Protected Dashboard Route */}
                <Route path="/dashboard" element={<ProtectedRoute element={<h1>Dashboard</h1>} user={user} loading={authLoading} />} />
                {/* Add other protected routes as needed */}
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
