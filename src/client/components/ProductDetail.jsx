import React from "react";
import {useState,useEffect} from "react";
import { useParams } from 'react-router-dom';

export default function ProductDetail(){
    const[productInfo,setProductInfo] = useState([]);
    const product = useParams();

    useEffect(() => {
        async function fetchPuppies() {
          try {
            const response = await fetch(`http://localhost:3000/api/products/27`)
            const productData = await response.json()
            console.log(productData);
          } catch (error) {
            console.error(error);
          }
        }
        fetchPuppies()
      }, []);

    return <section key={"1"}>
        <img src={"pup.imageUrl"} alt={"pup.breed"}/>
        <h2>{"pup.name"}</h2>
        <h2>Breed: {"pup.breed"}</h2>
        <h2>Status: {"pup.status"}</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae diam laoreet, tincidunt arcu in, placerat lectus. Donec vestibulum quam vitae sapien mattis, finibus efficitur nisi porttitor. In varius luctus ullamcorper. Nulla porta rhoncus malesuada. Etiam efficitur maximus urna. Sed vulputate, est id egestas varius, augue augue euismod mauris, a sagittis urna augue vel felis. Integer scelerisque iaculis cursus. Duis hendrerit ligula ipsum. Pellentesque et imperdiet magna. Proin risus leo, aliquam in tortor vulputate, facilisis pellentesque mauris. Donec non felis hendrerit, mattis risus et, fringilla ante. Nullam ac dictum tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultrices justo ut nibh porttitor, blandit ultrices ante commodo. Aliquam erat volutpat. </p>
        <button>Go Back!</button>
    </section>
}