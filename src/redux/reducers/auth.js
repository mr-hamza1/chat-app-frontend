import { createSlice } from "@reduxjs/toolkit";  //// create slice reducx  main ek tool hai jo  redux store imolement kerne or state , action ,reducer, ko manage kerta ahi
import { adminLogin, adminLogout, getAdmin } from "../thunk/admin";
import { toast } from "react-hot-toast";

const initialState = {     //// redux main hum hamesha initialState set kerte hain sab sai phele
    user: false,
    isAdmin: false,
    loader: true,
}

///Reducer :::----
// Reducer ek function hota hai, jo action ko handle karta hai aur state ko update karta hai.
// Reducer ek pure function hota hai jo current state aur action ko input ke roop me leta hai, aur naya state return karta hai.
// Yeh state ko directly mutate nahi karta, balki naya state return karta hai.

const authSlice = createSlice({   
    name: "auth",
    initialState,
    reducers: {                                 //// reducers pure func hote hain jo initialState ko update ker kai ek naya state kerta hai or  state initialState kai kiye istmala hota or action ager hum kusch updte kerte jese name =hamza then playload action ko data deta or state update hoti
        userExists: (state, action) => {
            state.user = action.payload;           /// Action (userExists) payload ke through user data bhejta hai.
            state.loader = false;           /////Reducer Aur Action ka Interaction: ///Action dispatch hone par reducer ko signal deta hai ki state ko update kiya jaye.
        },   
        userNotExists: (state) => { 
            state.user = null;   
            state.loader = false;
        },   
    },

    extraReducers:(builder) => {
        builder
              .addCase(adminLogin.fulfilled,(state, action) => {
                  state.isAdmin = true;
                  toast.success(action.payload);
              })
              .addCase(adminLogin.rejected,(state, action) => {
                  state.isAdmin = false;
                  toast.error(action.error.message);
              })
              .addCase(getAdmin.fulfilled,(state, action) => {
                if(action.payload)
                      state.isAdmin = true;
                else 
                    state.isAdmin = false;
              })
              .addCase(getAdmin.rejected,(state, action) => {
                  state.isAdmin = false;
              })
              .addCase(adminLogout.fulfilled,(state, action) => {
                state.isAdmin = false;
                toast.success(action.payload);
            })
              .addCase(adminLogout.rejected,(state, action) => {
                state.isAdmin = true;
                toast.error(action.error.message);
            })
    }
})


export default authSlice;

export const {userExists, userNotExists} = authSlice.actions
