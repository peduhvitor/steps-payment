import { useEffect, useContext } from "react"
import { Context } from "../../contexts/Context"


const DetailsOrder = () => {

    const { state } = useContext(Context)

    useEffect(() => {
        console.log(state.order);
    })

    return (
        <div>

        </div>
    )
}

export default DetailsOrder