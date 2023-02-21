import { createContext, useReducer } from 'react'
import { reducerAction } from '../types/reducerAction'
import { listCartType, listCartInitial, listCartReducer } from '../reducers/listCart'
import * as statusStep from '../reducers/statusStep'
import * as userInfo from '../reducers/userInfo'
import * as order from '../reducers/order'

type initialStateType = {
    userInfo: userInfo.InitialStateType,
    listCart: listCartType[],
    statusStep: statusStep.InitialStateType,
    order: order.InitialStateType
}

const initialState: initialStateType = {
    userInfo: userInfo.initialState,
    listCart: listCartInitial,
    statusStep: statusStep.initialState,
    order: order.initialState
}

type ContextType = {
    state: initialStateType,
    dispatch: React.Dispatch<any>
}

export const Context = createContext<ContextType>({
    state: initialState,
    dispatch: () => null
})

const mainReducer = (state: initialStateType, action: reducerAction) => ({
    userInfo: userInfo.reducer(state.userInfo, action),
    listCart: listCartReducer(state.listCart, action),
    statusStep: statusStep.reducer(state.statusStep, action),
    order: order.reducer(state.order, action)
})

export const ContextProvider = ({children}: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(mainReducer, initialState)

    return (
        <Context.Provider value= {{state, dispatch}} >
            { children }
        </Context.Provider>
    )
}