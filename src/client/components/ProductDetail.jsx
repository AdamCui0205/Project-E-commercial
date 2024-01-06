import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductDetail() {
    const [productInfo, setProductInfo] = useState(null);
    const { id } = useParams(); // Extracting the product ID from the URL
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProduct() {

            try {
                const response = await fetch(`https://localhost:4200/api/products/${id}`);
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
            const response = await fetch('https://localhost:4200/api/cart-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product_id: id,
                    quantity: 1, // You can customize the quantity as needed
                }),
            });

            if (response.ok) {
                // Assume the API returns the updated cart after adding an item
                const updatedCart = await response.json();
                console.log('Item added to cart:', updatedCart);

                // You can navigate to the cart page or display a notification to the user
            } else {
                console.error('Failed to add item to cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
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
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </section>
    );
}
