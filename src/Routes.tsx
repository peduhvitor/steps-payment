import { useRoutes } from "react-router-dom"
import CompleteRegisterVerify from "./middlewares/CompleteRegisterVerify"
import Cart from "./pages/Cart"
import CompleteRegister from "./pages/CompleteRegister"
import PaymentForm from "./pages/PaymentForm/PaymentForm"

const MainRoutes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> },
        { path: '/step-buy/complete-register', element: <CompleteRegisterVerify><CompleteRegister/></CompleteRegisterVerify> },
        { path: '/step-buy/payment-form', element: <PaymentForm/> }
    ])
}

export default MainRoutes