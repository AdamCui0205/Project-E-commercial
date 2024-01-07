import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
    const [productInfo, setProductInfo] = useState(null);
    const { id } = useParams(); // Extracting the product ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProductInfo(response.data);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!productInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <h2>{productInfo.title}</h2>
            <img src={productInfo.image_url} alt={`${productInfo.title}`} />
            <p>Description: {productInfo.description}</p>
            <p>Date Posted: {new Date(productInfo.post_date).toDateString()}</p>
            <p>Category: {productInfo.category}</p>
            <p>Price: ${productInfo.price.toFixed(2)}</p>
            <p>Available: {productInfo.is_available ? "Yes" : "No"}</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}
