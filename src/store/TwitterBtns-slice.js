import { createSlice } from "@reduxjs/toolkit";


const TwitterBtnsSlice = createSlice({
    name: 'btns',
    initialState: {
        loginBtnClicked: false,
        registerBtnClicked: false,
    },
    reducers: {
        loginClick(state) {
            state.loginBtnClicked = true
        },
        registerBtn(state){
            state.registerBtnClicked = true
        }
    }
})
export const TwitterActions = TwitterBtnsSlice.actions
export default TwitterBtnsSlice;