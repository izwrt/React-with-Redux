const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};


export default function accountReducer(state = initialStateAccount, action) {
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


export function deposite(amount) {
    return {
        type: "account/deposite", payload:amount
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