import { configureStore } from "@reduxjs/toolkit";
import { userReducer, loginAccount , logOutAccount } from "./slices/userSlice";
import { clientsReducer , addClient , removeClient, payBill, clickOnBell,closeAccount, payTransfer, redeemPoints,setReminder,reportTheftLossDamage, payCreditCardBill } from "./slices/clientsSlice";
import { bankerReducer } from "./slices/bankerSlice";
import { adminReducer } from "./slices/adminSlice";
import { impairedReducer } from "./slices/impairedSlice";

const store = configureStore({
    reducer : {
        user: userReducer,
        clients : clientsReducer,
        banker: bankerReducer,
        admin: adminReducer,
        impaired: impairedReducer
    }
});


export {
    store,
    loginAccount,
    logOutAccount,
    addClient,
    removeClient,
    payBill,
    payTransfer,
    closeAccount,
    redeemPoints,
    payCreditCardBill,
    reportTheftLossDamage,
    setReminder,
    clickOnBell
}