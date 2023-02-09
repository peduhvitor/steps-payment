import { useRoutes } from "react-router-dom"
import Cart from "./pages/Cart"
import CompleteRegister from "./pages/CompleteRegister"

const MainRoutes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> },
        { path: '/step-buy/complete-register', element: <CompleteRegister/> }
    ])
}

export default MainRoutes