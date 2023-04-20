import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false
    },
    reducers:{
        login(state){
            state.islogin = true
        },
        logout(state){
            state.islogin = false
        }
    }
})
export const authAction = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer,
})