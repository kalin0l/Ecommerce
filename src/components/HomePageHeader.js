import React from "react";
import { Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./homePageHeader.css";
import { ProductActions } from "../store/Product-slice";
import { FaShoppingCart } from "react-icons/fa";
import { FormActions } from "../store/Form-slice";

const HomePageHeader = () => {
  const email = useSelector((state) => state.register.username);
  const isClicked = useSelector((state) => state.products.isClicked);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    dispatch(FormActions.logOutHandler());
    history.replace('/');
  }


  return (
    <>
      <header className="home-header">
        <h3>Store</h3>
        <div>
          {!isClicked ? (
            <Link
              className="link"
              onClick={() => dispatch(ProductActions.goBack())}
              to="/products"
            >
              Products
            </Link>
          ) : (
            <Link
              className="link"
              onClick={() => dispatch(ProductActions.goBack())}
              to="/home"
            >
              Home
            </Link>
          )}
        </div>
        <Link to="/cart" className="shoppingCart">
          <FaShoppingCart />
          <span>{cart.length}</span>
        </Link>
        <div className="user-info">
        <p>{email}</p>
        {email && <button onClick={logOut}>Logout</button>}

        </div>
      </header>
    </>
  );
};

export default HomePageHeader;
