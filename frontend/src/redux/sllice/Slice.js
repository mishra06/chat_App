import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getmessage:[],
};

const messageSlice = createSlice({
    name:"msg",
    initialState,
    reducers:{
        SetMessage:(state,action)=>{
            state.getmessage = action.payload;
        }
    },
});

export const { SetMessage } = messageSlice.actions;

export default messageSlice.reducer;

