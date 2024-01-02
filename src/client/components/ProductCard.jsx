import React from "react";

const dummyProduct = {
  product_id: 0,
  price: 1.00,
  image_url: 'image1.jpg',
  post_date: new Date('2000-12-15'),
  description: 'This product is a dummy',
  title: 'Dummy',
  category: 'Fake',
  is_available: false,
}

export default function ProductCard(product){

    return <section key={product.product_id}>
        <h2>{product.title}</h2>
        <img src={product.image_url} alt={productInfo.image_url}/>
        <p>{product.description}</p>
        <h2>Date Posted: {"productInfo.post_date"}</h2>
        <h2>Category: {product.category}</h2>
        <h2>Price: {product.price}</h2>
        <h2>Available: {product.is_available ? ("Yes") : ("No")}</h2>
        <button>More Info!</button>
    </section>
}