import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function AccountInfo({userId}) {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {

            try {
                const response = await fetch(`http://localhost:3000/api/users/${userId}`);
                const userData = await response.json();
                console.log(userData);
                setUserInfo(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        }
        fetchUser();
    }, []);


    return (
        <section>
            <h1>{userInfo.first_name} {userInfo.last_name}</h1>
            <h2>E-mail: {userInfo.email}</h2>
            <h2>Phone: {userInfo.phone}</h2>
            <h2>Signup Date: {new Date(userInfo.signup_date).toDateString()}</h2>
            <button>Update Info</button>
            <button>Delete Account</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </section>
    );
}

