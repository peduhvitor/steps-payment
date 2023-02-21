import { useRoutes } from "react-router-dom"
import { UserExistVerify} from "./middlewares/UserExistVerify"
import Cart from "./pages/Cart/Cart"
import CompleteRegister from "./pages/CompleteRegister/CompleteRegister"
import PaymentForm from "./pages/PaymentForm/PaymentForm"

const MainRoutes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> },
        { path: '/step-buy/complete-register', 
            element: <UserExistVerify route='/cart'><CompleteRegister/></UserExistVerify> },
        { path: '/step-buy/payment-form', 
            element: <UserExistVerify route='/step-buy/complete-register' required><PaymentForm/></UserExistVerify> }
    ])
}

export default MainRoutes