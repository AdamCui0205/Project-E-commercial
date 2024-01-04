import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleMoreInfoClick = () => {
        navigate(`/product/${product.product_id}`);
    };

    return (
        <section>
            <h2>{product.title}</h2>
            <img src={product.image_url} alt={`${product.title} Image`} />
            <p>{product.description}</p>
            <h3>Date Posted: {new Date(product.post_date).toDateString()}</h3>
            <h3>Category: {product.category}</h3>
            <h3>Price: ${product.price.toFixed(2)}</h3>
            <h3>Available: {product.is_available ? "Yes" : "No"}</h3>
            <button onClick={handleMoreInfoClick}>More Info!</button>
        </section>
    );
}

export default ProductCard;
