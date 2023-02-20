import { useRoutes } from "react-router-dom"
import { UserExistVerify} from "./middlewares/StepsPayment"
import Cart from "./pages/Cart"
import CompleteRegister from "./pages/CompleteRegister"
import PaymentForm from "./pages/PaymentForm/PaymentForm"

const MainRoutes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> },
        { path: '/step-buy/complete-register', element: <UserExistVerify><CompleteRegister/></UserExistVerify> },
        { path: '/step-buy/payment-form', element: <UserExistVerify required><PaymentForm/></UserExistVerify> }
    ])
}

export default MainRoutes