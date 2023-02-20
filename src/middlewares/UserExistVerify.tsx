import { useContext, ReactNode, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../contexts/Context"

type Props = {
    children: ReactNode,
    required?: boolean,
    route?: string
}

export const UserExistVerify = ({children, required, route}: Props) => {
    const { state } = useContext(Context);
    const [showChildren, setShowChildren] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(required) {
            if(route) {
                if(state.userInfo.basicsInfo.id) {
                    setShowChildren(true)
                    return
                }
                navigate(route)
            }
            state.userInfo.basicsInfo.id && setShowChildren(true)
            return
        }

        if(route) {
            if(!state.userInfo.basicsInfo.id) {
                setShowChildren(true)
                return
            }
            navigate(route)
        }

        !state.userInfo.basicsInfo.id && setShowChildren(true)
        return
    }, [])

    return <>{showChildren && children}</>
}