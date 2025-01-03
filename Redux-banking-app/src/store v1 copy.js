import { applyMiddleware, combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/cusomerSlice';
import {thunk} from 'redux-thunk';

/* eslint-disable no-duplicate-case */

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
}) 

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;



