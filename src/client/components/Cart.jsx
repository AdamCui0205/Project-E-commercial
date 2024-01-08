import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
// The useEffect hook is used to fetch the cart items from the server when the component is first rendered. The cart items are stored in the cartItems state variable. The cart items are then displayed in the JSX.
    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://cache-corner.onrender.com/api/cart-items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://cache-corner.onrender.com/api/cart-items/${itemId}`, {
                headers: { Authorization: token }
            });
            fetchCartItems(); // Refresh the cart items
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
            // Add error handling logic here
        }
    };

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://cache-corner.onrender.com/api/orders', {}, {
                headers: { Authorization: token }
            });

            if (response.status === 201) {
                alert('Checkout successful!');
                fetchCartItems(); // Refresh the cart to show it's now empty
            } else {
                console.error('Checkout failed');
                // Add error handling logic here
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            // Add error handling logic here
        }
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
                            {item.product.title} - ${item.product.price.toFixed(2)} - Quantity: {item.quantity}
                            <button onClick={() => handleRemoveItem(item.cart_item_id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            {cartItems.length > 0 && (
                <div className="checkout-section">
                    <p>Total: ${cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}</p>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;