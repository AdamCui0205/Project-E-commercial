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
            <h3>Price: ${product.price.toFixed(2)}</h3>
            <button onClick={handleMoreInfoClick}>More Info!</button>
        </section>
    );
}

export default ProductCard;
