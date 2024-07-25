import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";

import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/Product/ProductCard";
function Orders() {
  const [{user, basket}, dispatch] = useContext(DataContext)
  const [orders, setOrders] = useState([])
  useEffect(()=>{
db.collection("users").doc(user?.uid)?.collection("orders").orderBy("created", "desc").onSnapshot((snapshot)=>{
  // console.log(snapshot)
  setOrders(snapshot.docs.map((doc)=>({
id:doc.id,
data: doc.data()
  })))
})
  },[])
  console.log(orders)
  return (
    <Layout>
<section className={classes.container}>
  <div className={classes.orders__container}>
    <h2>Your Orders</h2>
    {
      orders?.length === 0 && <div style={{padding:"20px"}}>You don't have orders yet</div>
    }
    {/* ordered items */}
    <div>
      {
        orders?.map((eachOrder)=>{
          return (
            <div>
              <hr />
              <p>Order ID : {eachOrder?.id}</p>
              {eachOrder?.data?.basket?.map((order)=>{
                return (
                  <ProductCard flex={true} product={order} key={order.id}/>
                )
              })}
            </div>
          )
        })
      }
    </div>
  </div>
</section>
    </Layout>
  );
}

export default Orders;