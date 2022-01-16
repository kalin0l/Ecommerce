
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Cart-slice";
import FormSlice from "./Form-slice";
import ProductSlice from "./Product-slice";
import TwitterBtnsSlice from './TwitterBtns-slice'


const store = configureStore({
    reducer: {
        login: TwitterBtnsSlice.reducer,
        register: FormSlice.reducer,
        products: ProductSlice.reducer,
        cart: cartSlice.reducer,
    },

    })


export default store