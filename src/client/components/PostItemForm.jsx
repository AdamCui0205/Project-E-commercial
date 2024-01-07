import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PostItemForm.css';

const PostItemForm = ({ isOpen, onClose }) => {
    // State hooks for form fields
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Function to handle the form submission
    const handlePostItem = async (event) => {
        event.preventDefault();
        setError('');

        if (!title || !description || !price) {
            setError('Please fill in all required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', parseFloat(price));
        formData.append('category', category);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://cache-corner.onrender.com/api/products',
                formData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.status === 201) {
                onClose();
                navigate('/');
            } else {
                setError('Failed to post the product');
            }
        } catch (error) {
            setError('An error occurred during posting.');
            console.error('Posting error:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="PostItemForm">
            <h2>Post a New Product</h2>
            <form onSubmit={handlePostItem}>
                {error && <div className="error-message">{error}</div>}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <button type="submit">Post Item</button>
            </form>
        </Modal>
    );
};

export default PostItemForm;
