import  { useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Cart = () => {
    const { cartItems, fetchCartItems } = useAuth(); // Use cartItems and fetchCartItems from AuthContext

    useEffect(() => {
        fetchCartItems(); // Fetch cart items when the component mounts
    }, [fetchCartItems]); // Only re-run the effect if fetchCartItems changes

    const handleRemoveItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`https://cache-corner.onrender.com/api/cart-items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchCartItems(); // Refresh the cart items from AuthContext after removing an item
        } catch (error) {
            console.error('Error removing item from cart:', error.message);
        }
    };

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://cache-corner.onrender.com/api/orders', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                alert('Checkout successful!');
                fetchCartItems(); // Refresh the cart to show it's now empty
            } else {
                console.error('Checkout failed');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
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