import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/RegisterModal.css';

const RegisterModal = ({ isOpen, onClose }) => {
    // State hooks for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    // State hook for error message
    const [error, setError] = useState('');

    // Function to handle the form submission
    const handleRegister = async (event) => {
        event.preventDefault();
        // Clear any previous error message
        setError('');

        const userData = {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            phone,
            address,
            addressLine2,
            city,
            state,
            zip
        };

        try {
            const response = await fetch('https://cache-corner.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);

                // Store the JWT token in localStorage or sessionStorage
                localStorage.setItem('token', data.token);

                // Close the modal if registration is successful
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
                // Set error message if request fails
                setError(errorData.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            // Set error message if request fails
            setError('An error occurred during registration.');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="registerModal" contentLabel="Register">
            <h2>Sign Up</h2>
            <form onSubmit={handleRegister}>
                {/* Error message display */}
                {error && <div className="error-message">{error}</div>}
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Address Line 2" />
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                <input type="text" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="ZIP Code" />

                <button type="submit">Sign Up</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default RegisterModal;