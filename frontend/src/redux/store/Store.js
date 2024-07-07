import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "../sllice/Slice";
const store = configureStore({
    reducer : {
        messageSlice,
    }
})

export default store;