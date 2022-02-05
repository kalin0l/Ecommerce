import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CartColumns from "../components/CartColumns";
import HomePageHeader from "../components/HomePageHeader";
import { formatPrice } from "../utils/helpers";
import { FaTrash } from "react-icons/fa";
import { cartActions } from "../store/Cart-slice";
import "./cartPage.css";
import { ProductActions } from "../store/Product-slice";

const CartPage = () => {
  const dispatch = useDispatch();
  const color = useSelector((state) => state.cart.color);
  console.log(color);
  const quantity = useSelector((state) => state.cart.quantity);
  console.log(quantity);
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.products.singleProduct);
  const shipping_fee = useSelector((state) => state.cart.shipping_fee);
  

  
  if (cart.length < 1) {
    return (
      <>
        <HomePageHeader />
        <div className="empty">
          <h1>Your cart is empty</h1>
          <Link
            to="/products"
            className="fill-btn"
            onClick={() => dispatch(ProductActions.goBack())}
          >
            Fill it
          </Link>
        </div>
      </>
    );
  }
  return (
    <>
      <HomePageHeader />
      <section>
        <CartColumns />
        {cart.map((item, i) => {
          console.log(item);
          return (
            <div key={i} className="main-div">
              <div key={i} className="title">
                <img src={item.image} alt={item.name} />
                <div>
                  <h5 className="name">{item.name}</h5>
                  <p className="color">
                    color:
                    <span
                      className="color-span"
                      style={{ backgroundColor: item.color }}
                    >
                      color
                    </span>
                  </p>
                </div>
              </div>
              <h5 className="price-small">
                {formatPrice(item.totalAmount / item.quantity)}
              </h5>
              <div className="counter">
                <button
                  type="button"
                  onClick={() =>
                    dispatch(cartActions.decrement(product.singleProduct))
                  }
                  className="counter-btn"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    dispatch(cartActions.increment(product.singleProduct))
                  }
                  className="counter-btn"
                >
                  +
                </button>
              </div>
              <h5 className="price">{formatPrice(item.totalAmount)}</h5>
              <button type="button" className="remove-btn">
                <FaTrash
                  onClick={() => dispatch(cartActions.removeCartItem(item.id))}
                />
              </button>
            </div>
          );
        })}
        <hr />
        <section className="btn-section">
          <Link className="link" to="products">
            Continue Shopping
          </Link>
          <button
            type="submit"
            onClick={() => dispatch(cartActions.clearCart())}
          >
            Clear shopping cart
          </button>
        </section>
      </section>
      <div className="final-details">
        <h3>Subtotal:{" "}{formatPrice(
            cart.reduce((cur, acc) => {
              const total = cur + acc.totalAmount;
              return total;
            }, 0)
          )} </h3>
        <p>Shipping fee: {formatPrice(shipping_fee)}</p>
        <hr />
        <h1>
          Order total:{" "}
          {formatPrice(
            cart.reduce((cur, acc) => {
              const total = cur + acc.totalAmount;
              return total;
            }, shipping_fee)
          )}
        </h1>
        <button type="submit">Pay</button>
      </div>
    </>
  );
};

export default CartPage;
