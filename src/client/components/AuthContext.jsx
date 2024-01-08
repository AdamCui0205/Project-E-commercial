import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setUserId] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('user_id');
        if (token && storedUserId) {
            setIsLoggedIn(true);
            setUserId(parseInt(storedUserId, 10));
        }
    }, []);
    const login = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId);
        setIsLoggedIn(true);
        setUserId(parseInt(userId, 10));
    };


    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        setUserId(null);
    };

    const registerSuccess = (token, userId) => {
        login(token, userId.toString());
    };

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/cart-items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchCartItems();
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user_id, login, logout, registerSuccess, cartItems, fetchCartItems }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);