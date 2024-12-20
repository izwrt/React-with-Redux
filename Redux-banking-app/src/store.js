import { createStore } from 'redux';

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
            return {...state, balance:state.balance - action.payload}

        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {...state, loan: action.payload.amount, loanPurpose:action.payload.purpose, balance: state.balance + action.payload.amount}

        case 'account/payLoan':
            return {
                ...state, 
                loan: state.loan - action.payload, 
                loanPurpose:"", 
                balance: state.balance - action.payload
            };
            
        default:
            return {...state}
    }
}

const store = createStore(reducer);

// store.dispatch({type: "account/deposite", payload:1000});
// console.log(store.getState());

// store.dispatch({type: 'account/withdraw', payload:500});
// console.log(store.getState());

// store.dispatch({type: "account/requestLoan", payload: { amount:1000, purpose: "Buy a car"}})
// console.log(store.getState());

// store.dispatch({type: "account/payLoan", payload:100})
// console.log(store.getState());

function deposite(amount) {
    return {
        type: "account/deposite", payload:amount
    }
}

function withdraw(amount) {
    return {
        type: 'account/withdraw', payload:amount
    }
}

function requestLoan (amount, purpose) {
    return {
        type: "account/requestLoan", payload: { amount:amount, purpose: purpose}
    }
}

function payLoan ( amount ) {
    return {
        type: "account/payLoan", payload:amount
    }
}

store.dispatch(deposite(1000));
store.dispatch(withdraw(1000));
store.dispatch(requestLoan(1000));
store.dispatch(payLoan(100));

console.log(store.getState());