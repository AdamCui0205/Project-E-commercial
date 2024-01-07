import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const PostItemForm = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image_url, setImage_url] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handlePostItem = async (event) => {
        event.preventDefault();
        setError('');

        if (!title || !description || !price) {
            setError('Please fill in all required fields.');
            return;
        }

        const productData = {
            title,
            description,
            price: parseFloat(price),
            image_url,
            category,
        };

        try {
            const token = window.localStorage.getItem('token');
            const response = await axios.post('/api/products', productData, {
                headers: {
                    Authorization: token
                }
            });

            if (response.status === 201) {
                onClose(); // Close the modal on successful post
            } else {
                setError('Failed to post the product');
            }
        } catch (err) {
            setError('An error occurred while posting the product.');
            console.error('Posting error:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Post a New Product">
            <h2>Sell your item.</h2>
            <form onSubmit={handlePostItem}>
                {error && <div className="error-message">{error}</div>}
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <input type="text" value={image_url} onChange={(e) => setImage_url(e.target.value)} placeholder="Image URL" />
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
                <button type="submit">Post Item</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default PostItemForm;
