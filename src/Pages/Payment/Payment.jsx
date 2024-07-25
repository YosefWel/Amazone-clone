import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "./../../Components/Product/ProductCard";
import {axiosInstance} from '../../Api/axios'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { Type } from "../../Utility/action.type";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate()
  const[processing,setProcessing] = useState(false)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const handlePayment = async(e) =>{
    e.preventDefault();
    try {
  setProcessing(true)
  // contact to the backend to get the client secret
  const response = await axiosInstance({
    method: "POST",
    url: `/payment/create?total=${total * 100}`,
  });
  console.log(response.data);
  console.log(response.data.client_secret);
  const clientSecret = response.data?.client_secret;
  //react side confirmation
  const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement),
    },
  });
  setProcessing(false)
  //save the orders on database
 await db
   .collection("users")
   .doc(user.uid)
   .collection("orders")
   .doc(paymentIntent.id)
   .set({
     basket: basket,
     amount: paymentIntent.amount,
     created: paymentIntent.created,
   })
   
   dispatch({
    type: Type.EMPTY_BASKET
   })
   setProcessing(false);
   navigate("/orders", { state: { msg: "You have placed new order" } });
} catch (error) {
  console.log(error); 
  setProcessing(false)
}
  }
  return (
    <Layout>
      {/* header */}
      <div className={classes.payment__header}> Checkout {totalItem} items</div>
      {/*Payment method */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3> Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div> Edawarda Wittgia</div>
            <div>Wroclaw ,Pl</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items & delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error*/}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Card Element*/}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "20px" }}>
                      <p>Total |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader size={15} color="gray" />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
