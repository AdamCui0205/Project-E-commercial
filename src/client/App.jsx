import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import PostItemForm from './components/PostItemForm';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for token in localStorage on initial render
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShowLogin(false); // Close the login modal on successful login
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <Header
                isLoggedIn={isLoggedIn}
                onLoginClick={() => setShowLogin(true)}
                onRegisterClick={() => setShowRegister(true)}
                onLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/post-item" element={<PostItemForm />} />
            </Routes>
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
            <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
            <Footer />
        </Router>
    );
}

export default App;
