import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
    const [productInfo, setProductInfo] = useState(null);
    const { id } = useParams(); // Extracting the product ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {

            try {
                const response = await fetch(`http://localhost:3000/api/products/${id}`);
                const productData = await response.json();
                setProductInfo(productData);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        }
        fetchProduct();
    }, [id]);

    if (!productInfo) {
        return <div>Loading...</div>; // Display while data is loading
    }

    return (
        <section>
            <h2>{productInfo.title}</h2>
            <img src={productInfo.image_url} alt={`${productInfo.title} Image`} />
            <div className="details">
                <p>Description: {productInfo.description}</p>
                <p>Date Posted: {new Date(productInfo.post_date).toDateString()}</p>
                <p>Category: {productInfo.category}</p>
                <p>Price: ${productInfo.price.toFixed(2)}</p>
                <p>Available: {productInfo.is_available ? "Yes" : "No"}</p>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </section>
    );
}
