import React, { useEffect } from "react";
import HomePageHeader from "../components/HomePageHeader";
import "./productPage.css";
import { getUniqueValues } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { fetchProductData } from "../store/ProductActions";
import ProductList from "../components/ProductList";
import { ProductActions } from "../store/Product-slice";
import { formatPrice } from "../utils/helpers";
import SortList from "../components/SortList";

const ProductPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const filter = useSelector((state) => state.products.filters);
  const text = useSelector((state) => state.products.filters.text);
  const category = useSelector((state) => state.products.filters.category);
  const minPrice = useSelector((state) => state.products.filters.min_price);
  const maxPrice = useSelector((state) => state.products.filters.max_price);
  const price = useSelector((state) => state.products.filters.price);
  const shipping = useSelector((state) => state.products.filters.shipping);

  const categories = getUniqueValues(products, "category");
  console.log(categories);
  const company = getUniqueValues(products, "company");
  console.log(company);
  const colors = getUniqueValues(products, "colors");
  console.log(colors);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  const updateFilters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
      console.log(name);
      console.log(value);
    }
    if (name === "color") {
      value = e.target.dataset.color;
      console.log(name, value);
    }
    if (name === "price") {
      value = Number(value);
      console.log(name, value);
    }
    if (name === "shipping") {
      value = e.target.checked;
      console.log(name, value);
    }

    dispatch(ProductActions.filterProducts());
    dispatch(ProductActions.setFilter({ name, value }));
  };
  return (
    <>
      <HomePageHeader />
      <section className="product-section">
        <div className="categories">
          <input
            type="text"
            placeholder="Search"
            name="text"
            value={text}
            onChange={updateFilters}
          />
          <h3>Category</h3>
          <div className="form-control-category">
            {categories.map((c, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  name="category"
                  onClick={updateFilters}
                  className={`${
                    category === c.toLowerCase() ? "active" : null
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
          <h5>company</h5>
          <div className="form-control">
            <select
              name="company"
              onChange={updateFilters}
              className="company"
            >
              {company.map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          <h3>colors</h3>
          <div className="form-control">
            <div className="colors">
              {colors.map((c, i) => {
                if (c === "all") {
                  return (
                    <button
                      key={i}
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        filter.color === "all" ? "all-btn active" : "all-btn"
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={i}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      filter.color === c ? "color-btn active" : "color-btn"
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {filter.color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
              <div className="form-control">
                <h5>Price: </h5>
                <p className="price">{formatPrice(price)}</p>
                <input
                  type="range"
                  name="price"
                  min={minPrice}
                  max={maxPrice}
                  onChange={updateFilters}
                  value={price}
                />
              </div>
        <div className='form-control-shipping'>
            <label htmlFor='shipping'> free shipping</label>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          <button type='button' className='clear-btn' onClick={() => dispatch(ProductActions.clearFilter())}>
          {' '}
          clear filters
        </button>
        </div>
        <div className="product-view">
          <SortList/>
          <ProductList />
        </div>
        <footer>
          <p>Made by Kalin Aleksiev</p>
        </footer>
      </section>
    </>
  );
};

export default ProductPage;
