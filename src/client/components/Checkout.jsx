import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Simulate a checkout process
        alert('Processing your order...');

        // Simulate a successful order placement
        setTimeout(() => {
            alert('Order placed successfully!');
            navigate('/');
        }, 2000);  // 2 second delay
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="card">Credit Card Number</label>
                    <input type="text" id="card" name="card" required />
                </div>
                <button type="submit" className="checkout-button" onClick={handleCheckout}>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
