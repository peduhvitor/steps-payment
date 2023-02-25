import { useContext } from 'react'
import { Context } from '../../../contexts/Context'
import cartFunctions from '../../../utils/cartFunctions';
import { useNavigate } from "react-router-dom"

const Header = () => {

    const { state } = useContext(Context);
    const { amountItensInTheCart } = cartFunctions(state.listCart)
    const navigate = useNavigate()

    return (
        <header className='h-[72px] flex justify-center border-b-[1px] sticky top-0 bg-white'>
            <div className='w-[90vw] max-w-[1296px] flex justify-between items-center'>
                <img className='w-16' src="/logo.svg" />

                <div 
                    onClick={() => navigate('/cart')}  
                    className='w-11 h-11 flex justify-center items-center relative cursor-pointer'>
                    <img src="/shopping-cart.svg" alt="" />
                    <div className='w-[14.4px] h-[14.4px] flex items-center justify-center rounded-full bg-[#122E5F] text-[9.6px] text-white absolute top-[3px] right-[3px]'>
                        {amountItensInTheCart}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header