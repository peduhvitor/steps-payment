import { useRoutes } from "react-router-dom"
import { CompleteRegisterVerify, PaymentFormVerify } from "./middlewares/StepsPayment"
import Cart from "./pages/Cart"
import CompleteRegister from "./pages/CompleteRegister"
import PaymentForm from "./pages/PaymentForm/PaymentForm"

const MainRoutes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> },
        { path: '/step-buy/complete-register', element: <CompleteRegisterVerify><CompleteRegister/></CompleteRegisterVerify> },
        { path: '/step-buy/payment-form', element: <PaymentFormVerify><PaymentForm/></PaymentFormVerify> }
    ])
}

export default MainRoutes