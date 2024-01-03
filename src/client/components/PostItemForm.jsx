import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/PostItemForm.css';
import axios from 'axios';

const PostItemForm = ({ isOpen, onClose, setShowPost }) => {
    // State hooks for form fields
    console.log("hello from post item form")
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImage_url] = useState('');
    const [user_id, setUser_id] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    // Function to handle the form submission
    const  handlePostItem= async (event) => {
        event.preventDefault();
        console.log("HELLO!!!")
        // Clear any previous error message
        setError('');

        const productData = {
           description,
           title,
           price: parseFloat(price),
           image_url,
           user_id,
           category,
        };

        try {
            const token = window.localStorage.getItem('token');
            console.log("token", token)
            // console.log(token);
            // const response = await fetch('https://cache-corner.onrender.com/api/products', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'authorization': String(token)
            //     },
            //     body: JSON.stringify(productData)
            // });

            // if (response.ok) {
            //     const data = await response.json();
            //     console.log('Post successful:', data);
            const response = await axios.post('http://localhost:4200/api/products', productData, {headers:{Authorization: token}})
            console.log(response);
                // Store the JWT token in localStorage or sessionStorage

                // Close the modal if Post is successful
                onClose();
            // } else {
            //     const errorData = await response.json();
            //     console.error('Post failed:', errorData.message);
            //     // Set error message if request fails
            //     setError('Failed to post product:', errorData.message);
            // }
        } catch (error) {
            console.error('Error during posting:', error);
            // Set error message if request fails
            setError('An error occurred during posting.');
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={()=> setShowPost(false)} className="PostItemForm" contentLabel="Post">
            <h2>Sign Up</h2>
            <form onSubmit={handlePostItem}>
                {/* Error message display */}
                {error && <div className="error-message">{error}</div>}
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="text" value={title} onChange={(e) => setPrice(e.target.value)} placeholder="Title" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <input type="string" value={image_url} onChange={(e) => setImage_url(e.target.value)} placeholder="Image_url" />
                <input type="int" value={user_id} onChange={(e) => setUser_id(e.target.value)} placeholder="User_id" />
                <input type="string" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />

                <button type="submit">Post</button>
                <button type="button" onClick={() => setShowPost(false)}>Cancel</button>
            </form>
        </Modal>
    );
};

export default PostItemForm;



