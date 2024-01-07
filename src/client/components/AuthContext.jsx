import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user_id, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('user_id');
        if (token && storedUserId) {
            setIsLoggedIn(true);
            setUserId(parseInt(storedUserId));
        }
    }, []);

    const login = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId.toString());
        setIsLoggedIn(true);
        setUserId(parseInt(userId));
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
        setUserId(null);
    };

    const registerSuccess = (token, userId) => {
        console.log(`Register success with token: ${token} and userID: ${userId}`);
        login(token, userId);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user_id, login, logout, registerSuccess }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);