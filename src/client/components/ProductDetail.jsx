import React from "react";
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';

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

export default function ProductDetail(){
    const[productInfo,setProductInfo] = useState(dummyProduct);
    const product = useParams();

    useEffect(() => {
        async function fetchProduct() {
          try {
            const response = await fetch(`http://localhost:3000/api/products/${product.id}`)
            const productData = await response.json()
            setProductInfo(productData);
          } catch (error) {
            console.error(error);
          }
        }
        fetchProduct()
      }, []);

    return <section key={productInfo.product_id}>
        <h2>{productInfo.title}</h2>
        <img src={productInfo.image_url} alt={productInfo.image_url}/>
        <section className="details">
        <h2>{productInfo.description}</h2>
        <h2>Date Posted: {productInfo.post_date.getDate()}</h2>
        <h2>Category: {productInfo.category}</h2>
        <h2>Price: {productInfo.price}</h2>
        <h2>Available: {productInfo.is_available ? ("Yes") : ("No")}</h2>
        <button>Buy!</button>
        </section>

        <button>Go Back!</button>
    </section>
}
