import { createSlice } from "@reduxjs/toolkit";

const FormSlice = createSlice({
  name: "form",
  initialState: {
    isLogin: true,
    isReg: false,
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
  },
  reducers: {
    calculateRemainingTime(state,action){
      const currentTime = new Date().getTime();
      const adjExpiration = action.payload;

      state.remainingTime = adjExpiration - currentTime;
      console.log(state.remainingTime);

    },
    regFormValidation(state) {
      state.isReg = true;
    },
    switchModHandler(state) {
      state.isLogin = !state.isLogin;
    },
    logOutHandler(state) {
      localStorage.clear();
      state.username = ''
      state.token = ''
    },
    loginHandler(state, action) {
      state.token = action.payload;
      localStorage.setItem('token',state.token)
     
    },
    setUsername(state, action) {
      state.username = action.payload;
      localStorage.setItem('username',state.username)
    },
   
  },
});
export const FormActions = FormSlice.actions;

export default FormSlice;
