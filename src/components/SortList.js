import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductActions } from "../store/Product-slice";
import './sortList.css'

const SortList = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(
    (state) => state.products.filtered_products
  );
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch(ProductActions.updateSort(value))
  }
  return (
    <>
      <p>{filteredProducts.length} products length</p>
      <hr />
      <form>
        <label htmlFor="sort">sort by</label>
        <select name="sort"  id="sort"  onChange={updateSort} className="sort-input">
          <option value="price-lowest">price (lowest)</option>
          <option value="price-highest">price (highest)</option>
          <option value="name-a">name (a-z)</option>
          <option value="name-z">name (z-a)</option>
        </select>
      </form>
    </>
  );
};
export default SortList;
