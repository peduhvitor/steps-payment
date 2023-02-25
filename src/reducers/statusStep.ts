import { reducerAction } from "../types/reducerAction"

export type InitialStateType = {
    step1: string,
    step2: string,
    step3: string,
    step4: string
}

export const initialState: InitialStateType = {
    step1: "notAccessed",
    step2: "notAccessed",
    step3: "notAccessed",
    step4: "notAccessed"
}

export const reducer = (state: InitialStateType, action: reducerAction) => {
    if (action.type === 'CHANGE-STEP') {
        if(action.payload.step) {
            let steps = [
                {step: 'notAccessed'},
                {step: 'notAccessed'},
                {step: 'notAccessed'},
                {step: 'notAccessed'}
            ]

            steps.forEach((item, index) => {
                if(action.payload.step - 1 === index) {
                    item.step = 'accessing'
        
                    steps.forEach((i, idx) => {
                        if(idx < index) {
                            i.step = 'accessed'
                        } else if (idx > index) {
                            i.step = 'notAccessed'
                        }
                    })
                }
            })

            return {
                step1: steps[0].step,
                step2: steps[1].step,
                step3: steps[2].step,
                step4: steps[3].step
            }
        }
    }

    

    return state
}