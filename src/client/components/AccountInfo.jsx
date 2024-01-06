import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const { isLoggedIn, logout } = useAuth();

export default function AccountInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {

            try {
                const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`);
                const userData = await response.json();
                console.log(userData);
                setUserInfo(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        }
        fetchUser();
    }, []);

    const deleteAccount = async () => {
        try{
            const response = await fetch(`http://localhost:3000/api/users/${localStorage.getItem('userId')}`,
                                        {
                                            method: "DELETE",
                                            headers: {"Authorization": `Bearer ${localStorage.getItem('token')}`},
                                        });
            const result = await response.json()
            console.log(result);
            logout();
            navigate(-1);
        } catch (error){
            console.error('Failed to delete user:', error);          
        }

    }


    

    if (!userInfo) {
        return <div>Loading...</div>; // Display while data is loading
    }

    return (
        <section>
            <h1>{userInfo.first_name} {userInfo.last_name}</h1>
            <h2>E-mail: {userInfo.email}</h2>
            <h2>Phone: {userInfo.phone}</h2>
            <h2>Signup Date: {new Date(userInfo.signup_date).toDateString()}</h2>
            <button>Update Info</button>
            <button onClick={deleteAccount}>Delete Account</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </section>
    );
}

