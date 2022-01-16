// import { createSlice } from "@reduxjs/toolkit";
// const FilterSlice = createSlice({
//     name: 'filter',
//     initialState: {
//         all_products: [],
//         filters: {
//             text: '',
//             company: 'all',
//             category: 'all',
//             color: 'all',
//             min_price: 0,
//             max_price: 0,
//             price: 0,
//             shipping: false,
//           },
//     },
//     reducers: {
//         // setFilter(state,action){
//         //     const { name, value } = action.payload;
//         //     console.log(name,value)
//         //     state.filters = { ...state.filters, [name]: value }
//         // },
//         // filterProducts(state,action){
//         //     const {text, category, company, color, price, shipping} = state.filters
//         //     let tempProducts = [...state.all_products];
//         //     if(text) {
//         //         tempProducts = tempProducts.filter(product => {
//         //             return product.name.toLowerCase.startsWith(text);
//         //         });
//         //     }
//         //     if(category !== 'all'){
//         //         tempProducts = tempProducts.filter(product => {
//         //             return product.category === category
//         //         })
//         //     }
//         //     if(company !== 'all'){
//         //         tempProducts = tempProducts.filter(product => {
//         //             return product.company === company
//         //         })
//         //     }
//         //     if(color !== 'all') {
//         //         tempProducts = tempProducts.filter(product => {
//         //             return product.color.find(c => c === color)
//         //         })
//         //     }
//         // }
//     }
// })
// export const FilterActions = FilterSlice.actions;
// export default FilterSlice;
"use strict";