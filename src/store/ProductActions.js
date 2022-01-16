import { ProductActions } from "./Product-slice";

export const fetchProductData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch("https://course-api.com/react-store-products");
      if (!res.ok) {
        throw new Error("There is no products");
      }
      const data = await res.json();
      return data;
    };
    try {
        const items = await fetchData();
        dispatch(ProductActions.setData(items))
        dispatch(ProductActions.loadProducts(items));
    }catch(err){
        console.log(err);
    }
  };

};
export function fetchSingleProduct(id) {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(`https://course-api.com/react-store-single-product?id=${id}`);
      if (!res.ok) {
        throw new Error("There is no product");
      }
      const data = await res.json();
      console.log(data);
      return data;
    };
    try {
      const item = await fetchData();
      dispatch(ProductActions.setSingleProd({
        singleProduct: item
      }));
    } catch (err) {
      console.log(err);
    }
  };
}
