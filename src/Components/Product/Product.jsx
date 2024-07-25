import React, {useState, useEffect} from 'react'
import axios from "axios"
import ProductCard from './ProductCard'
import classes  from "./Product.module.css";
import Loader from '../Loader/Loader';

function Product() {
    const [products, setProducts]= useState([])
        const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
          setisLoading(true)
axios.get("https://fakestoreapi.com/products").then((res)=>{
setProducts(res.data)
    setisLoading(false)
}).catch((err)=>{
  console.log(err)
    setisLoading(false)
})
    },[])
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.product_container}>
          {products?.map((singleProduct) => (
            <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
          ))}
        </div>
      )}
    </>
  );
}

export default Product
