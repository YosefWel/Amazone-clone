import React, { useContext } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import classes from "./header.module.css";
import Lowerheader from "./Lowerheader";
import {Link} from 'react-router-dom'
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"

function Header() {
 const [{ basket, user }, dispatch] = useContext(DataContext);
 const totalItem = basket?.reduce((amount,item)=>{
  return item.amount + amount
 },0)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <IoLocationOutline />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* <div> */}
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" id="" placeholder="search product" />
            <IoSearchSharp size={38} />
          </div>
          {/* </div> */}

          {/*right side */}

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://pngimg.com/uploads/flags/flags_PNG14655.png"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p> Hello {user.email.split("@")[0]}</p>
                    <span onClick={()=>{auth.signOut()}}>Sign Out</span>
                  </>
                ) : (
                  <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                  </>
                )}
              </div>

            </Link>
            {/* orders */}
            <Link to="/Orders">
              <p>returns</p>
              <span>& Orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              {/* icon */}
              <IoCartOutline size={35} />
              <p>{totalItem}</p>
            </Link>
          </div>
        </div>
      </section>
      <Lowerheader />
    </section>
  );
}

export default Header;
