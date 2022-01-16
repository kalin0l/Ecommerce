import React from "react";
import { Link } from "react-router-dom";
import HomePageHeader from "./HomePageHeader";

const Product = () => {
  return (
    <>
      <HomePageHeader />
      <section className='navigation'>
          <Link to='home'>Home</Link>
          <Link to='products'>Products</Link>
          <Link></Link>
      </section>
      <section className='product-view'>
          

      </section>
    </>
  );
};

export default Product;
