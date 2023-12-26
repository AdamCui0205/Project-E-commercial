import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="header">
            <div className="logo-container">
                <img src="../assets/logot.png" alt="Cache Corner Logo" />
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <nav className="nav-links">
                {isLoggedIn ? (
                    <>
                        <Link to="/post">Post</Link>
                        <Link to="/account">Account</Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;