import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
import {productUrl} from '../../Api/endpts'
function Results() {
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {categoryName} = useParams();
  useEffect(() => {
    setisLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res.data)
        setResults(res.data)
        setisLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setisLoading(false)
      })
  }, []);
  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <br />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.product_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                renderDesc={false}
                renderAdd={true}
              />
              
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Results;









