import { useRoutes } from "react-router-dom"

import Cart from "./pages/Cart"

const Routes = () => {
    return useRoutes([
        { path: '/cart', element: <Cart/> }
    ])
}

export default Routes