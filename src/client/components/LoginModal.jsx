import React from 'react';
import Modal from 'react-modal';

const LoginModal = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Login">
            <h2>Login</h2>
            {/* Login form goes here */}
            <button onClick={onClose}>Close</button>
        </Modal>
    );
};

export default LoginModal;
