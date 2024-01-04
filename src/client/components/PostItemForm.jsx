import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/PostItemForm.css';
//import axios from 'axios';

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
            console.log(token);
            const response = await fetch('http://localhost:4200/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': String(token)
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Post successful:', data);
            // const response = await axios.post('http://localhost:4200/api/products', productData, {headers:{Authorization: token}})
            // console.log(response);
            //     // Store the JWT token in localStorage or sessionStorage

            //     // Close the modal if Post is successful
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
        <div>
            <h1>Post Item Form</h1>
        </div>
    );
}

export default PostItemForm;