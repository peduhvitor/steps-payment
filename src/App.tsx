import { useContext } from 'react'
import { Context } from './contexts/Context'
import Routes from './Routes'
import cartFunctions from './utils/cartFunctions'
import './App.css'

const App = () => {
    const { state, dispatch } = useContext(Context);
    const { amountItensInTheCart } = cartFunctions(state.listCart)

    return (
        <div>
            <header className='h-[72px] flex justify-center border-b-[1px]'>
                <div className='w-[90vw] max-w-[1296px] flex justify-between items-center'>
                    <img className='w-16' src="/logo.svg"/>

                    <div className='w-11 h-11 flex justify-center items-center relative'>
                        <img src="/shopping-cart.svg" alt="" />
                        <div className='w-[14.4px] h-[14.4px] flex items-center justify-center rounded-full bg-[#122E5F] text-[9.6px] text-white absolute top-[3px] right-[3px]'>
                            { amountItensInTheCart }
                        </div>
                    </div>
                </div>
                
            </header>

            <Routes/> 

        </div>
    )
}

export default App