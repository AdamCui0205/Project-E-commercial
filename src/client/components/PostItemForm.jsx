import axios from 'axios';
import { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const PostItemForm = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const cloudinaryUploadPreset = 'cachecorner';

    const handlePostItem = async (event) => {
        event.preventDefault();
        setError('');

        if (!title || !description || !price) {
            setError('Please fill in all required fields.');
            return;
        }

        try {
            let imageUrl = '';
            if (image) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', cloudinaryUploadPreset);

                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );

                imageUrl = cloudinaryResponse.data.secure_url;
            }

            const productData = {
                title,
                price: parseFloat(price),
                category,
                description,
                image_url: imageUrl
            };

            const token = localStorage.getItem('token');
            const response = await axios.post(
                'https://cache-corner.onrender.com/api/products',
                productData,
                { headers: { Authorization: token } }
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
