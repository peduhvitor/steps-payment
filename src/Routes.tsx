import { useRoutes } from "react-router-dom"
import Cart from "./pages/Cart"
import CompleteRegister from "./pages/CompleteRegister"
import PaymentForm from "./pages/PaymentForm/PaymentForm"

const MainRoutes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> },
        { path: '/step-buy/complete-register', element: <CompleteRegister/> },
        { path: '/step-buy/payment-form', element: <PaymentForm/> }
    ])
}

export default MainRoutes