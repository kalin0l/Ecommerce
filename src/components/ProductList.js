import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import { ProductActions } from "../store/Product-slice";
import "./productList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.filtered_products);
  const filters = useSelector((state) => state.products.filters);
  const allProducts = useSelector((state) => state.products.products);
  const sort = useSelector(state => state.products.sort);

 
  useEffect(() => {
    dispatch(ProductActions.loadProducts(allProducts));
  }, [dispatch,allProducts]);
  useEffect(() => {
    dispatch(ProductActions.filterProducts())
  },[dispatch,filters])
  useEffect(() => {
    dispatch(ProductActions.sortProducts());
  },[dispatch,sort])

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products matched your search...
      </h5>
    );
  }
  return (
    <section className="products">
      {products.map((product) => {
        const { image, name, id, price, description } = product;
        return (
          <div className="product" key={id}>
            <div className="link-container">
              <Link className="link" to={`/products/${id}`}>
                <img src={image} alt={name} />
              </Link>
            </div>
            <div className="price">
              <div>
                <h5>{name}</h5>
              </div>
              <div>
                <p>{formatPrice(price)}</p>
              </div>
              <div>
                <p>{description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProductList;
