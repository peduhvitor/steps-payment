import { useReducer } from "react";
import products from "../data/products";
import { reducerAction } from "../types/reducerAction";

export type listCartType = {
    id: string,
    amount: number
}

export const listCartInitial: listCartType[] = [
    {id: products[0].id, amount: 1},
    {id: products[3].id, amount: 2},
    {id: products[2].id, amount: 4}
]

export const listCartReducer = (state: listCartType[], action: reducerAction) => {
    switch(action.type) {
        case 'ADD':
            if(action.payload?.id) {
                let newState = [...state, {id: action.payload.id, amount: 1}];
                return newState
            }
        case 'REMOVE':
            if(action.payload?.id) {
                let newState = [...state];

                newState = newState.filter(item => item.id !== action.payload?.id)

                return newState
            }  
        case 'SET_AMOUNT': 
            if(action.payload?.amount && action.payload.id) {
                let newState = [...state]

                newState.forEach(item => {
                    if(item.id === action.payload?.id) {
                        if(action.payload.amount !== undefined) {
                            item.amount = action.payload.amount
                        }
                    }
                })

                return newState
            }
    }

    return state;
}