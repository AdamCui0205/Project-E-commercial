import React from "react";

export default function ProductCard(product){

    return <div key={product.product_id} className="product-card">
        <h2>{product.title}</h2>
        <img src={product.image_url} alt={product.image_url}/>
        <p>{product.description}</p>
        <p>Date Posted: {"productInfo.post_date"}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Available: {product.is_available ? ("Yes") : ("No")}</p>
        <button>More Info!</button>
    </div>
}


// <h2>{product.title}</h2>
// <p>Description: {product.description}</p>
// <p>Price: ${product.price}</p>
// {/* Add other product information as needed */}
// </div>