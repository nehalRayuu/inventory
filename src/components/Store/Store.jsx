import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import  saleOrdersReducer from "./saleSlice"

const store = configureStore({
    reducer : {
        auth : authReducer,
        saleOrders: saleOrdersReducer
    }
})

export default store;