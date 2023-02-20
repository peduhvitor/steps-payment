import { reducerAction } from "../types/reducerAction";

export type InitialStateType = {
    basicsInfo: {
        id: string,
        name: string,
        email: string ,
        password: string 
    }, 
    creditCards: []
}

export const initialState: InitialStateType = {
    basicsInfo: {
        id: '',
        name: '',
        email: '',
        password: ''
    },
    creditCards: []
}

export const reducer = (state: InitialStateType, action: reducerAction) => {
    if(action.type === 'CHANGE_DATA_USER') {
        return { ...state, basicsInfo: { ...state.basicsInfo, ...action.payload.data } }
    }

    return state
}