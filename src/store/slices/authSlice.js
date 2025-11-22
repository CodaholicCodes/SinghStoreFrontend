import { createSlice } from "@reduxjs/toolkit"

const initialState={
    isLoggedIn : localStorage.getItem('token') ? true : false,
    token : localStorage.getItem('token') || null,
    userType : localStorage.getItem('userType') || null
}

const authSLice=createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state,action)=>{
            state.isLoggedIn=true;
            state.userType=action.payload.userType;
            state.token=action.payload.token;
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("userType",action.payload.userType);
        },
        logOut : (state)=>{
            state.isLoggedIn=false;
            state.token=null;
            state.userType=null;
            localStorage.removeItem("token");
            localStorage.removeItem('userType');
        }
    }
});

export const {login,logOut}=authSLice.actions;
export const authReducer=authSLice.reducer;