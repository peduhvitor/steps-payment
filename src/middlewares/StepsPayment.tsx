import { useContext } from "react"
import { Context } from "../contexts/Context"

export const CompleteRegisterVerify = ({children}: React.PropsWithChildren) => {
    const logged = false
    
    return <>{!logged && children}</>
}

export const PaymentFormVerify = ({children}: React.PropsWithChildren) => {

    const { state } = useContext(Context)

    const allowOpen = () => {
        const { name, email, password } = state.userInfo.basicsInfo

        if(name && email && password) {
            return true
        } 

        return true
    }

    return (
        <>
            { allowOpen() && children }
        </>
    )
    
}