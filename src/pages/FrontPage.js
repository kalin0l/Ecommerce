import React from "react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { TwitterActions } from "../store/TwitterBtns-slice";
import { Link } from "react-router-dom";
import {SiShopify} from 'react-icons/si'
import {GiWorld} from 'react-icons/gi'
import "./frontPage.css";

const FrontPage = () => {

  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="main">
        <section className="left-side" >
          <h4>Find what you need</h4>
          <h4>
            <SiShopify/>
            Explore our products
            </h4>
          <h4>Join us </h4>
        </section>
        <section className="right-side">
          <div className="twitter-btns">
            <h1>Explore our world!
              <GiWorld/>
            </h1>
            <p>Join Ecommerce today!</p>
            <Link className="upper-btn" to='/regForm'>Sign Up</Link>
            <Link className="lower-btn" to='/form' onClick={() => dispatch(TwitterActions.loginClick())}>Log in</Link>
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default FrontPage;
