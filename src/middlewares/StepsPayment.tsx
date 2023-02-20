import { useContext, ReactNode } from "react"
import { Context } from "../contexts/Context"

type Props = {
    children: ReactNode,
    required?: boolean
}

export const UserExistVerify = ({children, required}: Props) => {
    const { state } = useContext(Context);

    if(required) {
        return <>{state.userInfo.basicsInfo.id && children}</>
    }

    return <>{!state.userInfo.basicsInfo.id && children}</>
}