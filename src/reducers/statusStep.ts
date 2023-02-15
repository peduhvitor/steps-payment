import { reducerAction } from "../types/reducerAction"

type PageStatus = 'notAccessed' | 'accessing' | 'accessed'

export type InitialStateType = {
    completeRegister: string,
    paymentForm: string,
    details: string
}

export const initialState: InitialStateType = {
    completeRegister: "notAccessed",
    paymentForm: "notAccessed",
    details: "notAccessed",
}

export const reducer = (state: InitialStateType, action: reducerAction) => {
    if (action.type === 'CHANGE-STEP') {
        switch (action.payload.page) {
            case 'completeRegister':
                return {
                    completeRegister: 'accessing',
                    paymentForm: 'notAccessed',
                    details: 'notAccessed'
                }
            case 'paymentForm':
                return {
                    completeRegister: 'accessed',
                    paymentForm: 'accessing',
                    details: 'notAccessed'
                }
            case 'details':
                return {
                    completeRegister: 'accessed',
                    paymentForm: 'accessed',
                    details: 'accessing'
                }
        }
    }

    return state
}