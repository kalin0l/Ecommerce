"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FormActions = void 0;

var _toolkit = require("@reduxjs/toolkit");

var FormSlice = (0, _toolkit.createSlice)({
  name: "form",
  initialState: {
    isLogin: true,
    isReg: false,
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token')
  },
  reducers: {
    calculateRemainingTime: function calculateRemainingTime(state, action) {
      var currentTime = new Date().getTime();
      var adjExpiration = action.payload;
      state.remainingTime = adjExpiration - currentTime;
      console.log(state.remainingTime);
    },
    regFormValidation: function regFormValidation(state) {
      state.isReg = true;
    },
    switchModHandler: function switchModHandler(state) {
      state.isLogin = !state.isLogin;
    },
    logOutHandler: function logOutHandler(state) {
      localStorage.clear();
      state.username = '';
      state.token = '';
    },
    loginHandler: function loginHandler(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', state.token);
    },
    setUsername: function setUsername(state, action) {
      state.username = action.payload;
      localStorage.setItem('username', state.username);
    }
  }
});
var FormActions = FormSlice.actions;
exports.FormActions = FormActions;
var _default = FormSlice;
exports["default"] = _default;