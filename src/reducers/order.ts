import { reducerAction } from "../types/reducerAction"
import { listCartType } from "./listCart"

export type InitialStateType = {
    list: listCartType[],
    user: {
        id: string,
        name: string,
        email: string,
    },
    address: {
        cep: string,
        road: string,
        number: string,
        neighborhood: string,
        city: string,
        state: string,
    },
    paymentForm: {
        method: string,
        infoCard?: {
            name: string,
            number: string,
            validity: string,
            cvc: string
        }
    },
    orderDetails: {
        code: string,
        status: string
    }
}

export const initialState: InitialStateType = {
    list: [],
    user: {
        id: '',
        name: '',
        email: '',
    },
    address: {
        road: '',
        number: '',
        neighborhood: '',
        city: '',
        state: ''
    },
    paymentForm: {
        method: ''
    },
    orderDetails: {
        code: '',
        status: ''
    }
}

export const reducer = (state: InitialStateType, action: reducerAction) => {
    if(action.type === 'CREATE_ORDER') {
        return {
            list: action.payload.list,
            user: action.payload.user,
            address: action.payload.address,
            paymentForm: action.payload.paymentForm,
            orderDetails: action.payload.orderDetails
        }
    }

    return state
}