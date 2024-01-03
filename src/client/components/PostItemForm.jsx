import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/PostItemForm.css';

const PostItemForm = ({ isOpen, onClose }) => {
    // State hooks for form fields
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImage_url] = useState('');
    const [post_date, setPost_date] = useState('');
    const [is_avaiable, setIs_avaiable] = useState(false);
    const [user_id, setUser_id] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    // Function to handle the form submission
    const  handlePostItem= async (event) => {
        event.preventDefault();
        // Clear any previous error message
        setError('');

        const productData = {
           description,
           price: parseFloat(price),
           image_url,
           post_date,
           is_avaiable,
           user_id,
           category,
        };

        try {
            const response = await fetch('https://cache-corner.onrender.com//api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Post successful:', data);

                // Store the JWT token in localStorage or sessionStorage
                localStorage.setItem('token', data.token);

                // Close the modal if registration is successful
                onClose();
            } else {
                const errorData = await response.json();
                console.error('Post failed:', errorData.message);
                // Set error message if request fails
                setError('Failed to post product:', errorData.message);
            }
        } catch (error) {
            console.error('Error during posting:', error);
            // Set error message if request fails
            setError('An error occurred during posting.');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="PostItemForm" contentLabel="Post">
            <h2>Sign Up</h2>
            <form onSubmit={handlePostItem}>
                {/* Error message display */}
                {error && <div className="error-message">{error}</div>}
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <input type="string" value={image_url} onChange={(e) => setImage_url(e.target.value)} placeholder="Image_url" />
                <input type="date" value={post_date} onChange={(e) => setPost_date(e.target.value)} placeholder="Post_date" />
                <input type="checkbox" checked={is_avaiable} onChange={(e) => setIs_avaiable(e.target.checked)} placeholder="Is_avaiable" />
                <input type="int" value={user_id} onChange={(e) => setUser_id(e.target.value)} placeholder="User_id" />
                <input type="string" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />

                <button type="submit">Post</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default PostItemForm;



