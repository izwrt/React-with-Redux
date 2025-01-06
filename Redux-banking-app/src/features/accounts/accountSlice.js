import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    currentLoanPurpose: "",
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposite(state, action) {
            state.balance += action.payload
        },

        withdraw(state,action) {
            if (state.balance < action.payload) return;
            state.balance -= action.payload
        },

        requestLoan: {
            reducer(state,action) {
            if (state.loan > 0) return;
            state.loan = action.payload.amount;
            state.currentLoanPurpose = action.payload.purpose;
            state.balance += state.loan;
            },

            prepare(amount, purpose) {
               return {
                payload: {amount, purpose}
               } 
            }
        },

        payLoan(state,action) {
            state.balance -= state.loan;
            state.loan -= action.payload;
            state.currentLoanPurpose = ''; 
        }
    }
});

console.log(accountSlice);

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

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

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialState, action) {
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

*/