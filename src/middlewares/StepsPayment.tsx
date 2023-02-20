import { useContext } from "react"
import { Context } from "../contexts/Context"

export const UserExistVerify = ({children}: React.PropsWithChildren) => {
    const { state } = useContext(Context);
    return <>{!state.userInfo.basicsInfo.id && children}</>
}