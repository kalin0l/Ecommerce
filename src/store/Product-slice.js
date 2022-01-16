import { createSlice, current } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    total_price: 0,
    singleProduct: {},
    img: null,
    mainColor: null,
    isClicked: false,
    sort: 'price-lowest',
    filters: {
      text: "",
      company: "all",
      category: "all",
      color: "all",
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
    },
    filtered_products: [],
  },
  reducers: {
    setData(state, action) {
      state.products = action.payload;
    },
    setSingleProd(state, action) {
      state.singleProduct = action.payload;
    },
    setImg(state, action) {
      state.img = action.payload;
    },
    setColor(state, action) {

      state.mainColor = action.payload;
    },
    goBack(state) {
      state.isClicked = !state.isClicked;
    },
    setFilter(state, action) {
      console.log(action.payload);
      const { name, value } = action.payload;
      state.productsLoad = false;
      state.filters = {
       ...state.filters,
        [name]:value
      };
    },
    filterProducts(state) {
      const { category,text,company, color,price,shipping} = state.filters;
      let tempProduct = [...state.products];

      if (category !== "all") {
        tempProduct = tempProduct.filter((item) => item.category === category)
      }
      if(text){
        tempProduct = tempProduct.filter(item => item.name.toLowerCase().startsWith(text))
      }
      console.log(company);
      if(company !== 'all'){
        tempProduct = tempProduct.filter(item => item.company === company)
      }
      console.log(color)
      console.log(current(state));
      if(color !== 'all'){
        tempProduct = tempProduct.filter(item => {
         
          return item.colors.find(c => c === color)
        })
      }
      if(price){

        tempProduct = tempProduct.filter((item) => item.price <= price)
      }
      if (shipping) {
        tempProduct = tempProduct.filter((item) => item.shipping === true)
      }
      state.filtered_products = tempProduct;
    },
    clearFilter(state){
      state.filters = {
        text: "",
        company: "all",
        category: "all",
        color: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false,
      }

    },

    loadProducts(state,action){
      state.filtered_products = action.payload;
      let maxPrice = action.payload.map(p => p.price);
      maxPrice = Math.max(...maxPrice);

      state.filters.max_price = maxPrice;
    },
    updateSort(state,action){
      console.log(action.payload)
      state.sort = action.payload;
    },
    sortProducts(state){
      const {sort } = state;
      console.log(sort);
      let tempProducts = [...state.filtered_products];
      if(sort === 'price-lowest'){
        tempProducts = tempProducts.sort((a,b) =>{
          if(a.price > b.price){
            return 1;
          }
          if(a.price < b.price){
            return -1;
          }
          return 0;
        })
      }
      if(sort === 'price-highest'){
        tempProducts = tempProducts.sort((a, b) => b.price - a.price)
      }
      if(sort === 'name-a'){
        tempProducts = tempProducts.sort((a, b) => {
         return a.name.localeCompare(b.name);
        })

      }
      if(sort === 'name-z'){
        tempProducts = tempProducts.sort((a, b) => {
        return  b.name.localeCompare(a.name);
        })
      }
      state.filtered_products = tempProducts;

    },
   
  },
});
export const ProductActions = ProductSlice.actions;
export default ProductSlice;
