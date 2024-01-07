import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
    const [productInfo, setProductInfo] = useState(null);
    const { id } = useParams(); // Extracting the product ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {

            try {
                const response = await fetch(`http://localhost:4200/api/products/${id}`);
                const productData = await response.json();
                setProductInfo(productData);
            } catch (error) {
                console.error('Failed to fetch product:', error);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Redirect to login or show a modal to log in
                navigate('/login');
                return;
            }

            // Make a request to add the product to the cart
            await axios.post(
                'http://localhost:4200/api/cart-items',
                { product_id: id, quantity: 1 },
                {
                    headers: {
                        'authorization': `${token}`
                    }
                }
            );

            // Provide feedback to the user (optional)
            console.log('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error.message);
        }
    };


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
                <button onClick={handleAddToCart}>Add To Cart</button>
            </div>
        </section>
    );
}
//commend
