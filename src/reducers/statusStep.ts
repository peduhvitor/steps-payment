import { reducerAction } from "../types/reducerAction"

export type InitialStateType = {
    completeRegister: boolean,
    paymentForm: boolean,
    details: boolean
}

export const initialState = {
    completeRegister: false,
    paymentForm: false,
    details: false
}

export const reducer = (state: InitialStateType, action: reducerAction) => {
    if(action.type === 'CHANGE-STEP') {
        switch(action.payload.page) {
            case 'completeRegister':
                return {...state, completeRegister: true}
            case 'paymentForm':
                return {...state, paymentForm: true}
            case 'details':
                return {...state, details: true}
        }
    }

    return state
}