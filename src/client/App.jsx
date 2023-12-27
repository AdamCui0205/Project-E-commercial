import React, { useState } from 'react';
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

    return (
        <Router>
            <Header onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/post-item" element={<PostItemForm />} />
            </Routes>
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
            <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
            <Footer />
        </Router>
    );
}

export default App;
