import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import PostItemForm from './components/PostItemForm';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import AccountInfo from './components/AccountInfo';
import Cart from './components/Cart';
import { AuthProvider } from "./components/AuthContext";

function App() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showPost, setShowPost] = useState(false);
    const [userId, setUserId] = useState(null);
    const [cart, setCart] = useState([]);
    const updateCart = (newCart) => {
        setCart(newCart);
    };

    return (
        <AuthProvider>
            <Router>
                <Header onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} setShowPost={setShowPost} setUserId={setUserId} />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/account" element={<AccountInfo />} />
                    <Route path="/post-item" element={<PostItemForm isOpen={showPost} onClose={() => setShowPost(false)} setShowPost={setShowPost} updateCart={updateCart}/>} />
                    <Route path="/cart" element={<Cart cart={cart} updateCart={updateCart} />} />
                </Routes>
                <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)}/>
                <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
