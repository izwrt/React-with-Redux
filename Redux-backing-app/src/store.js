import {createStore} from 'redux'

/* eslint-disable no-duplicate-case */
const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case "account/deposite":
            return {...state, balance: state.balance + action.payload}

        case "account/withdraw":
            return {...state, balance:state.balance - action.balance}

        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {...state, loan: action.payload }

        case 'account/requestLoan':
            return {
                ...state, 
                loan: 0, 
                loanPurpose:"", 
                balance: state.balance - action.payload
            };
            
        default:
            return {...state}
    }
}

const store = createStore(reducer);

store.dispatch({type: "account/deposite", payload:1000})