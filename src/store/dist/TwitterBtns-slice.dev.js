"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TwitterActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var TwitterBtnsSlice = (0, _toolkit.createSlice)({
  name: 'btns',
  initialState: {
    loginBtnClicked: false,
    registerBtnClicked: false
  },
  reducers: {
    loginClick: function loginClick(state) {
      state.loginBtnClicked = true;
    },
    registerBtn: function registerBtn(state) {
      state.registerBtnClicked = true;
    }
  }
});
var TwitterActions = TwitterBtnsSlice.actions;
exports.TwitterActions = TwitterActions;
var _default = TwitterBtnsSlice;
exports["default"] = _default;