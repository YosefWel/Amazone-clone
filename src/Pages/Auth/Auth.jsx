import React, { useState, useContext } from 'react'
import classes from "./Signup.module.css"
import { Link , useLocation, useNavigate } from "react-router-dom";
import { auth } from '../../Utility/firebase';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import {ClipLoader} from 'react-spinners'
function Auth() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate()
const navStateData = useLocation()
console.log(navStateData)
const[loading, setLoading] = useState({
  signIn: false,
  signUp: false,
})
const[{user}, dispatch] = useContext(DataContext)
const authHandler = async(e)=>{
  e.preventDefault()
 if(e.target.name === "sign in"){
  setLoading({
    ...loading,
    signIn:true,
  })
 signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
  // console.log(userInfo)
dispatch({
  type: Type.SET_USER,
  user: userInfo.user,
})
  setLoading({
    ...loading,
    signIn: false,
  })
  navigate(navStateData?.state?.redirect || "/");
}).catch((err)=>{
setError(err.message)
setLoading({
  ...loading,
  signIn: false,
})
})
  
 }else{
  setLoading({
    ...loading,
    signUp: true,
  });
  createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
dispatch({
  type: Type.SET_USER,
  user: userInfo.user,
})
  setLoading({
    ...loading,
    signUp: false,
  })
  navigate(navStateData?.state?.redirect || "/");
}).catch((err)=>{
setError(err.message)
  setLoading({
    ...loading,
    signUp: false,
  })
  })

 }
}
  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>

      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {navStateData?.state?.msg && (
          <small style={{ textAlign: "center", color: "red", fontWeight: "bold", padding: "5px" }}>
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
            />
          </div>

          <button
            onClick={authHandler}
            name="sign in"
            className={classes.login_signInBtn}
            type="submit"
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>
        <p>
          By signing in you agree to the AMAZON Create your Amazon FAKE CLONE
          Conditions of Use and Sale. our cookies Notice and our interset Based
          Ads Notice
        </p>
        <button
          onClick={authHandler}
          name="sign out"
          className={classes.login_registerBtn}
          type="submit"
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazone account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "20px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
