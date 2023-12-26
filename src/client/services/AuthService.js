import axios from 'axios';

const API_URL = 'https://cache-corner.onrender.com';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/Login`, { email, password });
    if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
    }
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('userToken');
    window.location.reload();
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('userToken');
    return !!token;
};
