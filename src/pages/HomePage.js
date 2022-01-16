import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../store/ProductActions";

import { Link } from "react-router-dom";
import { ProductActions } from "../store/Product-slice";

import HomePageHeader from "../components/HomePageHeader";
import { formatPrice } from "../utils/helpers";
import "./homePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.products);
  console.log(items);
  useEffect(() => {
    dispatch(fetchProductData());
  },[dispatch]);
 
 
  return (
    <>
      <HomePageHeader />
      <section className="main-content">
        <div className="sub-header">
          <div className="text">
            <h1>Design your own home</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              iure quasi odit tenetur unde officiis repudiandae quod deserunt
              quia eum?
            </p>
            <Link to="products"  onClick={() => dispatch(ProductActions.goBack())} className="product-btn">Show now</Link>
          </div>
        </div>
        <div className="products">
          <h1>PRODUCTS</h1>
          <div className="container">
          {items && items.slice(0,5).map((item, i) => {
            return (
              <div key={i} className='img-container'>
                  
                  <Link to={`/products/${item.id}`} className="link">
                    <img src={item.image} alt={item.name} />
                    </Link>
                    <h5>{item.name}</h5>
                    <p>{formatPrice(item.price)}</p>
                </div>
            );
          })}
          </div>
        </div>
      </section>
      <footer className="footer">
        <h3>Made by Kalin Aleksiev</h3>
      </footer>
    </>
  );
};

export default HomePage;
