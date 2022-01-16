"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.cartActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var cartSlice = (0, _toolkit.createSlice)({
  name: "cart",
  initialState: {
    quantity: 0,
    totalQuantity: 0,
    cart: [],
    totalAmount: 0,
    isShown: false,
    changed: false,
    shipping_fee: 500
  },
  reducers: {
    clearCart: function clearCart(state) {
      state.cart = [];
      state.quantity = 0;
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    addItem: function addItem(state, action) {
      var _action$payload = action.payload,
          id = _action$payload.id,
          price = _action$payload.price,
          color = _action$payload.color,
          name = _action$payload.name,
          stock = _action$payload.stock;
      console.log(action.payload);
      var newItem = action.payload;
      var existingItem = state.cart.find(function (item) {
        return item.id === newItem.id;
      });
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.cart.push({
          id: id,
          quantity: state.quantity,
          totalAmount: price * state.quantity,
          color: color,
          name: name,
          image: action.payload.image.url,
          max: stock,
          amount: price
        });
      } else {
        existingItem.totalAmount = existingItem.totalAmount + price;
        existingItem.quantity++;
      }
    },
    incremetSingleProduct: function incremetSingleProduct(state, action) {
      state.quantity++;

      if (state.quantity > action.payload) {
        state.quantity = action.payload;
      }
    },
    increment: function increment(state, action) {
      var _action$payload2 = action.payload,
          id = _action$payload2.id,
          stock = _action$payload2.stock,
          price = _action$payload2.price;
      console.log(action.payload);
      var tempCart = state.cart.map(function (item) {
        if (item.id === id) {
          item.totalAmount = item.totalAmount + item.totalAmount / item.quantity;

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
    decrementSingleProduct: function decrementSingleProduct(state) {
      state.quantity--;

      if (state.quantity < 0) {
        state.quantity = 0;
      }
    },
    decrement: function decrement(state, action) {
      var id = action.payload.id;
      var tempCart = state.cart.map(function (item) {
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
    show: function show(state) {
      state.isShown = true;
    },
    removeCartItem: function removeCartItem(state, action) {
      console.log(action);
      state.cart = state.cart.filter(function (item) {
        return item.id !== action.payload;
      });
    }
  }
});
var cartActions = cartSlice.actions;
exports.cartActions = cartActions;
var _default = cartSlice;
exports["default"] = _default;