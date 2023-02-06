import { createContext, useReducer } from 'react'
import { listCartType, listCartInitial, listCartReducer } from '../reducers/listCart'
import { reducerAction } from '../types/reducerAction'

type initialStateType = {
    listCart: listCartType[]
}

const initialState: initialStateType = {
    listCart: listCartInitial
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
    listCart: listCartReducer(state.listCart, action)
})

export const ContextProvider = ({children}: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(mainReducer, initialState)

    return (
        <Context.Provider value= {{state, dispatch}} >
            { children }
        </Context.Provider>
    )
}