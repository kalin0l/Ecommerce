"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ProductActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProductSlice = (0, _toolkit.createSlice)({
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
      shipping: false
    },
    filtered_products: []
  },
  reducers: {
    setData: function setData(state, action) {
      state.products = action.payload;
    },
    setSingleProd: function setSingleProd(state, action) {
      state.singleProduct = action.payload;
    },
    setImg: function setImg(state, action) {
      state.img = action.payload;
    },
    setColor: function setColor(state, action) {
      state.mainColor = action.payload;
    },
    goBack: function goBack(state) {
      state.isClicked = !state.isClicked;
    },
    setFilter: function setFilter(state, action) {
      console.log(action.payload);
      var _action$payload = action.payload,
          name = _action$payload.name,
          value = _action$payload.value;
      state.productsLoad = false;
      state.filters = _objectSpread({}, state.filters, _defineProperty({}, name, value));
    },
    filterProducts: function filterProducts(state) {
      var _state$filters = state.filters,
          category = _state$filters.category,
          text = _state$filters.text,
          company = _state$filters.company,
          color = _state$filters.color,
          price = _state$filters.price,
          shipping = _state$filters.shipping;

      var tempProduct = _toConsumableArray(state.products);

      if (category !== "all") {
        tempProduct = tempProduct.filter(function (item) {
          return item.category === category;
        });
      }

      if (text) {
        tempProduct = tempProduct.filter(function (item) {
          return item.name.toLowerCase().startsWith(text);
        });
      }

      console.log(company);

      if (company !== 'all') {
        tempProduct = tempProduct.filter(function (item) {
          return item.company === company;
        });
      }

      console.log(color);
      console.log((0, _toolkit.current)(state));

      if (color !== 'all') {
        tempProduct = tempProduct.filter(function (item) {
          return item.colors.find(function (c) {
            return c === color;
          });
        });
      }

      if (price) {
        tempProduct = tempProduct.filter(function (item) {
          return item.price <= price;
        });
      }

      if (shipping) {
        tempProduct = tempProduct.filter(function (item) {
          return item.shipping === true;
        });
      }

      state.filtered_products = tempProduct;
    },
    clearFilter: function clearFilter(state) {
      state.filters = {
        text: "",
        company: "all",
        category: "all",
        color: "all",
        min_price: 0,
        max_price: 0,
        price: 0,
        shipping: false
      };
    },
    loadProducts: function loadProducts(state, action) {
      state.filtered_products = action.payload;
      var maxPrice = action.payload.map(function (p) {
        return p.price;
      });
      maxPrice = Math.max.apply(Math, _toConsumableArray(maxPrice));
      state.filters.max_price = maxPrice;
    },
    updateSort: function updateSort(state, action) {
      console.log(action.payload);
      state.sort = action.payload;
    },
    sortProducts: function sortProducts(state) {
      var sort = state.sort;
      console.log(sort);

      var tempProducts = _toConsumableArray(state.filtered_products);

      if (sort === 'price-lowest') {
        tempProducts = tempProducts.sort(function (a, b) {
          if (a.price > b.price) {
            return 1;
          }

          if (a.price < b.price) {
            return -1;
          }

          return 0;
        });
      }

      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort(function (a, b) {
          return b.price - a.price;
        });
      }

      if (sort === 'name-a') {
        tempProducts = tempProducts.sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      }

      if (sort === 'name-z') {
        tempProducts = tempProducts.sort(function (a, b) {
          return b.name.localeCompare(a.name);
        });
      }

      state.filtered_products = tempProducts;
    }
  }
});
var ProductActions = ProductSlice.actions;
exports.ProductActions = ProductActions;
var _default = ProductSlice;
exports["default"] = _default;