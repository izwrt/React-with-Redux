import {configureStore} from "@reduxjs/toolkit";
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/cusomerSlice';

const store = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
})

export default store;



