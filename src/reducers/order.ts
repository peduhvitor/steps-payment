import { reducerAction } from "../types/reducerAction"

export type InitialStateType = {
    list: [
        {
            id: string,
            name: string,
            amount: number,
            currentPrice: number
        }
    ],
    user: {
        id: string,
        name: string,
        email: string,
    },
    address: {
        cep: string,
        road: string,
        number: string,
        complement: string,
        neighborhood: string,
        city: string
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
    list: [{
        id: '',
        name: '',
        amount: 0,
        currentPrice: 0
    }],
    user: {
        id: '',
        name: '',
        email: '',
    },
    address: {
        cep: '',
        road: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: ''
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

        if (action.payload.list) {
            return { ...state, list: action.payload.list } 
        }

        if (action.payload.user) {
            return { ...state, user: action.payload.user } 
        }

        if (action.payload.address) {
            return { ...state, address: action.payload.address } 
        }

        if (action.payload.paymentForm) {
            return { ...state, paymentForm: action.payload.paymentForm } 
        }

        if (action.payload.orderDetails) {
            return { ...state, orderDetails: action.payload.orderDetails } 
        }
    }

    return state
}