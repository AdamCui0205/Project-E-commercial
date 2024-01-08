import React from 'react';
import { useCart } from 'react-use-cart';

const Cart = () => {
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();

    if (isEmpty) return <p>Your cart is empty</p>;

    return (
        <div>
            <h2>Cart ({totalUniqueItems}) total items: ({totalItems})</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.title} ({item.quantity}) - ${item.itemTotal.toFixed(2)}
                        <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                        <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                        <button onClick={() => removeItem(item.id)}>Remove Item</button>
                    </li>
                ))}
            </ul>
            <p>Total: ${cartTotal.toFixed(2)}</p>
            <button onClick={() => emptyCart()}>Clear Cart</button>
        </div>
    );
};

export default Cart;
