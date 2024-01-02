import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    fetch('https://cache-corner.onrender.com/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Products:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <h2>{product.title}</h2>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Add other product information as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
