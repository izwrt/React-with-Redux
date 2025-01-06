import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fullName: "",
    nationalId: "",
    createAt: "",
};

const customerReducer = createSlice({
    name: 'customer',
    initialState,
    reducers: 
    {
        createCustomer: {
            reducer(state, action) {
            state.fullName = action.payload.fullName;
            state.nationalId = action.payload.nationalId;
            state.createAt = action.payload.createAt;
        },
        prepare(fullName,nationalId,createAt) {
            return {
                payload: {fullName, nationalId, createAt},
            }
        }
    },
    updateName(state,action) {
        state.fullName = action.payload;
    }
}
});

export default customerReducer.reducer;
export const {createCustomer} = customerReducer.actions

// export default function customerReducer ( state=initialStateCustomer,action ) {
//     switch(action.type) {
//         case 'customer/createCustomer':
//             return {
//                 ...state,
//                 fullName: action.payload.fullName,
//                 nationalId: action.payload.nationalId,
//                 createAt: action.payload.createAt
//             };

//         case 'customer/updateName':
//             return {
//                 ...state,
//                 fullName: action.payload
//             };
        
//         default: return state;
//     }
// }

// export function createCustomer(fullName, nationalId){
//     return {
//         type: "customer/createCustomer",
//         payload: {
//             fullName, nationalId, createAt: new Date().toISOString
//         }
//     }
// }

// export function updateName(fullName) {
//     return {
//         type: "customer/updateName",
//         payload: fullName
//     }
// }
