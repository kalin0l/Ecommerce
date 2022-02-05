import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../store/ProductActions";
import "../pages/singleProductPage.css";
import { ProductActions } from "../store/Product-slice";
import { FaCheck } from "react-icons/fa";
import { formatPrice } from "../utils/helpers";
import { cartActions } from "../store/Cart-slice";

const SingleProductPage = () => {
  const { id } = useParams();
  
  const dispatch = useDispatch();

  const item = useSelector((state) => state.products.singleProduct);
  const img = useSelector((state) => state.products.img);
  const mainColor = useSelector((state) => state.products.mainColor);
  const quantity = useSelector((state) => state.cart.quantity);
  const isLoggedIn = useSelector((state) => state.register.token);

  const changeMainImg = (i) => {
    dispatch(ProductActions.setImg(item.singleProduct.images[i].url));
  };
  const changeColor = (i) => {
    dispatch(ProductActions.setColor(item.singleProduct.colors[i]));
  };

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);
  
  return (
    <section className="single-product">
      <div className="img-container">
        <div className="link-container">
          <Link to="/home" className="link">
            Back
          </Link>
        </div>
        {item.singleProduct && item.singleProduct.images && (
          <img
            className="main-img"
            src={img ? img : item.singleProduct.images[0].url}
            alt={item.singleProduct.images[0].filename}
          />
        )}
        <div className="small-img">
          {item.singleProduct &&
            item.singleProduct.images &&
            item.singleProduct.images.map((_, i) => {
              return (
                <div key={i} className="small-img-container">
                  <img
                    onClick={() => changeMainImg(i)}
                    src={item.singleProduct.images[i].url}
                    alt={item.singleProduct.images[i].filename}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {item.singleProduct && (
        <div className="text-container">
          <h1>{item.singleProduct.name}</h1>
          <span>{item.singleProduct.start}</span>
          <span>{formatPrice(item.singleProduct.price)}</span>
          <p>{item.singleProduct.description}</p>
          <div className="detail-container">
            <h5>Available: {item.singleProduct.stock > 0 && "In Stock"}</h5>
            <h5>SKU: {item.singleProduct.id}</h5>
            <h5>Brand: {item.singleProduct.company}</h5>
          </div>
          <div className="bottom-details">
            <div>
              Colors:{" "}
              {item.singleProduct.colors.map((color, i) => {
                return (
                  <button
                    key={i}
                    style={{ background: color }}
                    className={`${
                      mainColor === color ? "color-btn active" : "color-btn"
                    }`}
                    onClick={() => changeColor(i)}
                  >
                    <FaCheck />
                  </button>
                );
              })}
            </div>
            <div className="counter">
              <button
                type="button"
                onClick={() => dispatch(cartActions.decrementSingleProduct())}
                className="counter-btn"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() =>
                  dispatch(
                    cartActions.incremetSingleProduct(item.singleProduct.stock)
                  )
                }
                className="counter-btn"
              >
                +
              </button>
            </div>
            {item.singleProduct && (
              <Link
                to="/cart"
                className="btn"
                onClick={() =>
                  dispatch(
                    cartActions.addItem({
                      image: item.singleProduct.images[0],
                      id: item.singleProduct.id,
                      stock: item.singleProduct.stock,
                      color: mainColor,
                      name: item.singleProduct.name,
                      price: item.singleProduct.price,
                    })
                  )
                }
              >
                Add to cart
              </Link>
            )}
            {!isLoggedIn && <p className='error'>You have to be logged in order to add products to the cart!</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default SingleProductPage;
