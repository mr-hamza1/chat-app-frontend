import { createSlice } from "@reduxjs/toolkit";  //// create slice reducx  main ek tool hai jo  redux store imolement kerne or state , action ,reducer, ko manage kerta ahi
import { getOrSaveFromStroage } from "../../Lib/features.js";
import { NEW_MESSAGE_ALERT } from "../../Components/constants/event.js";

const initialState = {     //// redux main hum hamesha initialState set kerte hain sab sai phele

    notificationCount: 0,
    newMessagesAlert: getOrSaveFromStroage({key: NEW_MESSAGE_ALERT, get: true}) || [{
        chatId: "",
        count: 0,
    }]
   
}

///Reducer :::----
// Reducer ek function hota hai, jo action ko handle karta hai aur state ko update karta hai.
// Reducer ek pure function hota hai jo current state aur action ko input ke roop me leta hai, aur naya state return karta hai.
// Yeh state ko directly mutate nahi karta, balki naya state return karta hai.

const chatSlice = createSlice({   
    name: "chat",
    initialState,
    reducers: {                                 //// reducers pure func hote hain jo initialState ko update ker kai ek naya state kerta hai or  state initialState kai kiye istmala hota or action ager hum kusch updte kerte jese name =hamza then playload action ko data deta or state update hoti
        incrementNotification: (state) => {
            state.notificationCount +=1;           /// Action (userExists) payload ke through user data bhejta hai.         /////Reducer Aur Action ka Interaction: ///Action dispatch hone par reducer ko signal deta hai ki state ko update kiya jaye.
        },
        setNotificationCount: (state) => {
            state.notificationCount = 0;           /// Action (userExists) payload ke through user data bhejta hai.         /////Reducer Aur Action ka Interaction: ///Action dispatch hone par reducer ko signal deta hai ki state ko update kiya jaye.
        },
        removeMessagesAlert: (state, action) => {
            state.newMessagesAlert =  state.newMessagesAlert.filter(
                (item) => item.chatId !== action.payload
            )
        },
        setNewMessagesAlert: (state, action) => {
            const chatId = action.payload.chatId
            const index = state.newMessagesAlert.findIndex(
                (item) => item.chatId === chatId
            )
            if (index !== -1) {
                state.newMessagesAlert[index].count += 1
            } else {
                state.newMessagesAlert.push({
                    chatId,
                    count: 1,
                });
            }
        },
       
    } 
     
})


export default chatSlice; 

export const {
    incrementNotification,
    setNotificationCount,
    setNewMessagesAlert,
    removeMessagesAlert,

} = chatSlice.actions
