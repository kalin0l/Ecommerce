"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _CartSlice = _interopRequireDefault(require("./Cart-slice"));

var _FormSlice = _interopRequireDefault(require("./Form-slice"));

var _ProductSlice = _interopRequireDefault(require("./Product-slice"));

var _TwitterBtnsSlice = _interopRequireDefault(require("./TwitterBtns-slice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    login: _TwitterBtnsSlice["default"].reducer,
    register: _FormSlice["default"].reducer,
    products: _ProductSlice["default"].reducer,
    cart: _CartSlice["default"].reducer
  }
});
var _default = store;
exports["default"] = _default;