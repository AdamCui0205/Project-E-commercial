import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from the backend when the component mounts
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await axios.get(`http://localhost:4200/api/cart-items`); // Adjust the URL as needed
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost:4200/api/cart-items/${itemId}`); // Adjust the URL as needed
            fetchCartItems(); // Update the cart items after removing an item
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
        }
    };

    const handleCheckout = () => {
        // Implement checkout logic if needed
        console.log('Checkout logic goes here');
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.cart_item_id}>
                            {item.product.name} - ${item.product.price} - Quantity: {item.quantity}
                            <button onClick={() => handleRemoveItem(item.cart_item_id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="checkout-section">
                    <p>Total: ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}</p>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;