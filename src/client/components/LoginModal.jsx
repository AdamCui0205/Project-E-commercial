import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // TODO: Login logic will go here
        console.log("Logging in:", { email, password });
        onClose(); // Close modal after login is complete. TODO: Handle errors
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="loginModal"
            contentLabel="Login"
        >
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default LoginModal;