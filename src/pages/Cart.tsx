import { useContext } from "react"
import BackButtonAndTitle from "../components/global/BackButtonAndTitle/BackButtonAndTitle"
import CartProduct from "../components/pageCart/CartProduct/CartProduct"
import RelatedProducts from "../components/pageCart/RelatedProducts/RelatedProducts"
import { Context } from "../contexts/Context"
import cartFunctions from "../utils/cartFunctions"

const Cart = () => {
    const pageTitle = 'Carrinho'

    const { state, dispatch } = useContext(Context)
    const { productsInTheCart, suggestedProducts, amountItensInTheCart, subTotal } = cartFunctions(state.listCart)

    return (
        <div>
            <div className='flex flex-col w-full items-center my-10'>

            { productsInTheCart.length > 0 ?
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>
                
                <div className='flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8'>
                    <div className='max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]'>
                        { productsInTheCart.map((item, index) => (
                            <>
                            <CartProduct data={item} amount={item.amount}/>
                            
                            { index < (productsInTheCart.length -1) && 
                                <div className="line bg-[#DADFE8]"></div>
                            }
                            </>
                        )) }
                    </div>

                    <div className='h-min flex flex-col gap-8 max-2xl:max-w-[820px] max-2xl:w-full flex-1'>
                        <div className='h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px] w-full'>
                            <div className='w-full flex flex-col gap-5'>
                                <div className='flex flex-col'>
                                    <div className='font-medium text-[18px] text-[#3F4E6E]'>Resumo</div>
                                    <div className='text-[16px] text-[#6D737D]'>{amountItensInTheCart} Produtos</div>
                                </div>

                                <div className="line bg-[#DADFE8]"></div>

                                <div className='flex justify-between items-center'>
                                    <div className='text-[24px] text-[#3F4E6E]'>Subtotal:</div>
                                    <div className='text-[32px] text-[#293652] font-medium'><span className='text-[24px]'>R$</span>{subTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</div>
                                </div>

                                <button className='h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]'>
                                    Pronto para pagar 
                                </button>
                            </div>
                        </div>
                        
                        { suggestedProducts.length > 0 &&
                            <div className='h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]'>
                                <div className='font-medium text-[18px] text-[#3F4E6E]'>Produtos relacionados</div>

                                { suggestedProducts.map((item, index) => (
                                    <>
                                    <RelatedProducts data={item} action={dispatch}/>
                                    
                                    { index < (suggestedProducts.length -1) && 
                                        <div className="line bg-[#DADFE8]"></div>
                                    }
                                    </>
                                )) }
                            </div>
                        }
                    </div>
                </div>
                
            </div>
            :
            <div className='max-w-[1024px] w-[90vw] h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]'>
                Sem produtos para exibir
            </div>
            }

            </div>
        </div>
    )
}

export default Cart