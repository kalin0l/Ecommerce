"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _reduxToolkitForm = _interopRequireDefault(require("redux-toolkit-form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RootReducer = (0, _toolkit.combineReducers)({
  form: _reduxToolkitForm["default"]
});
var _default = RootReducer;
exports["default"] = _default;