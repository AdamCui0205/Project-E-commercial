import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PostItemForm.css';
const PostItemForm = ({ isOpen, onClose }) => {
    // State hooks for form fields
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImage_url] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Hook for navigation

    // Function to handle the form submission
    const handlePostItem = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setError(''); // Clear any previous errors

        // Form validation logic (if any required fields are missing, set an error message)
        if (!title || !description || !price) {
            setError('Please fill in all required fields.');
            return;
        }

        // Data to be sent to the server
        const productData = {
            title,
            description,
            price: parseFloat(price), // Ensure price is a number
            image_url,
            category,
        };

        try {
            const token = localStorage.getItem('token'); // Retrieve auth token from localStorage
            const response = await axios.post(
                'https://cache-corner.onrender.com/api/products', // API endpoint
                productData,
                { headers: { Authorization: token } } // Authorization header
            );

            if (response.status === 201) {
                onClose(); // Close the modal on successful post
                navigate('/'); // Redirect to the homepage
            } else {
                setError('Failed to post the product'); // Set error if response status is not 201
            }
        } catch (error) {
            setError('An error occurred during posting.'); // Set error on catch
            console.error('Posting error:', error);
        }
    };

    // Rendering the form inside a modal
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="PostItemForm">
            <h2>Post a New Product</h2>
            <form onSubmit={handlePostItem}>
                {error && <div className="error-message">{error}</div>}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <input type="text" value={image_url} onChange={(e) => setImage_url(e.target.value)} placeholder="Image URL" />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                <button type="submit">Post Item</button>
            </form>
        </Modal>
    );
};

export default PostItemForm;
