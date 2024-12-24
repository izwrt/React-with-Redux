import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/cusomerSlice';

/* eslint-disable no-duplicate-case */

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
}) 

const store = createStore(rootReducer);
store.dispatch({type:"account/deposite", payload: 1000})

console.log(store.getState());

export default store;



