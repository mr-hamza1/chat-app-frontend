import { createSlice } from "@reduxjs/toolkit";  //// create slice reducx  main ek tool hai jo  redux store imolement kerne or state , action ,reducer, ko manage kerta ahi

const initialState = {     //// redux main hum hamesha initialState set kerte hain sab sai phele
    isNewGroup: false,
    isAddMember: false,
    isNotification: false,
    isMobileMenu: false,
    isProfile: false,
    isSearch: false,
    isDeleteMenu: false,
    isFileMenu: false,
    uploadingLoader: false,
    selectDeleteChat: {
        chatId: "",
        groupChat: false,
    }
   
}

///Reducer :::----
// Reducer ek function hota hai, jo action ko handle karta hai aur state ko update karta hai.
// Reducer ek pure function hota hai jo current state aur action ko input ke roop me leta hai, aur naya state return karta hai.
// Yeh state ko directly mutate nahi karta, balki naya state return karta hai.

const miscSlice = createSlice({   
    name: "misc",
    initialState,
    reducers: {                                 //// reducers pure func hote hain jo initialState ko update ker kai ek naya state kerta hai or  state initialState kai kiye istmala hota or action ager hum kusch updte kerte jese name =hamza then playload action ko data deta or state update hoti
        setIsNewGroup: (state, action) => {
            state.isNewGroup = action.payload;           /// Action (userExists) payload ke through user data bhejta hai.         /////Reducer Aur Action ka Interaction: ///Action dispatch hone par reducer ko signal deta hai ki state ko update kiya jaye.
        },   
        setIsAddMember: (state, action) => { 
            state.isAddMember = action.payload;   
        },
        setIsNotification: (state, action) => {
            state.isNotification = action.payload;
        },
        setIsMobileMenu: (state, action) => {
            state.isMobileMenu = action.payload;
        },
        setIsProfile: (state, action) => {
            state.isProfile = action.payload;
        },
        setIsSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },
        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setSelectDeleteChat: (state, action) => {
            state.selectDeleteChat = action.payload;
        },

    },
})


export default miscSlice;

export const {
    setIsNewGroup,
    setIsAddMember,
    setIsNotification,
    setIsMobileMenu,
    setIsSearch,
    setIsDeleteMenu,
    setIsFileMenu,
    setUploadingLoader,
    setSelectDeleteChat,
    setIsProfile,

} = miscSlice.actions
