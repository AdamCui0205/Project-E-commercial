import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch the list of products from the API
        fetch('https://cache-corner.onrender.com/api/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="product-list-container">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.product_id} product={product} />
                    ))
                ) : (
                    <p>No products found.</p> // Display this message if there are no products
                )}
            </div>
        </div>
    );
};

export default ProductList;
