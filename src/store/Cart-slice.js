import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    totalQuantity: 0,
    cart: [],
    totalAmount: 0,
    isShown: false,
    changed: false,
    shipping_fee: 500,
   
  },
  reducers: {
    clearCart(state) {
      state.cart = [];
      state.quantity = 0;
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    addItem(state, action) {
      const { id, price, color, name, stock } = action.payload;
      console.log(action.payload);

      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.cart.push({
          id,
          quantity: state.quantity,
          totalAmount: price * state.quantity,
          color,
          name,
          image: action.payload.image.url,
          max: stock,
          amount: price,
        });
      } else {
        existingItem.totalAmount = existingItem.totalAmount + price;
        existingItem.quantity++;
      }
    },
    incremetSingleProduct(state, action) {
      state.quantity++;
      if (state.quantity > action.payload) {
        state.quantity = action.payload;
      }
    },
    increment(state, action) {
      const { id, stock, price } = action.payload;
      console.log(action.payload);

      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          item.totalAmount =
            item.totalAmount + item.totalAmount / item.quantity;
          if (item.totalAmount > price * stock) {
            item.totalAmount = price * stock;
          }
          item.quantity++;
          if (item.quantity > stock) {
            item.quantity = stock;
          }
        }
        return item;
      });
      state.cart = tempCart;
     
    },
    decrementSingleProduct(state) {
      state.quantity--;
      if (state.quantity < 0) {
        state.quantity = 0;
      }
    },
    decrement(state, action) {
      const { id } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          item.totalAmount = item.totalAmount - item.amount;
          item.quantity--;
          if (item.totalAmount < item.amount) {
            item.totalAmount = item.amount;
          }
          if (item.quantity < 1) {
            item.quantity = 1;
          }
        }
        return item;
      });
      state.cart = tempCart;
    },
    show(state) {
      state.isShown = true;
    },
    removeCartItem(state,action){
      console.log(action)
      state.cart = state.cart.filter(item => item.id !== action.payload)

    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice;
