import { createSlice } from "@reduxjs/toolkit";

const initialStateAccount = {
    balance: 0,
    loan: 0,
    currentLoanPurpose: "",
};


export default function accountReducer(state = initialStateAccount, action) {
    switch(action.type) {
        case "account/deposite":
            return {...state, balance: state.balance + action.payload}

        case "account/withdraw":
            return {...state, balance:state.balance - action.payload}

        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {...state, loan: action.payload.amount, currentLoanPurpose:action.payload.purpose, balance: state.balance + action.payload.amount}

        case 'account/payLoan':
            return {
                ...state, 
                loan: state.loan - action.payload, 
                currentLoanPurpose:"", 
                balance: state.balance - action.payload
            };
            
        default:
            return {...state}
    }
}

function convert(from, to, amount) {
    return fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
      .then((resp) => resp.json())
      .then((data) => {
        return (amount * data.rates[to].toFixed(2)); 
      });
  }
  

export function deposite(amount, currency) {
    if(currency === 'USD')
    return {
        type: "account/deposite", payload:amount
    };

    return async function (dispatch,getState) {
        const res = await convert(currency, "USD", amount);
        console.log(typeof res);

        dispatch({ type: "account/deposite", payload: res});
    }
}

export function withdraw(amount) {
    return {
        type: 'account/withdraw', payload:amount
    }
}

export function requestLoan (amount, purpose) {
    return {
        type: "account/requestLoan", payload: { amount:amount, purpose: purpose}
    }
}

export function payLoan ( amount ) {
    return {
        type: "account/payLoan", payload:amount
    }
}