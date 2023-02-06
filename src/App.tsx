import CartProduct from './components/CartProduct/CartProduct'
import RelatedProducts from './components/RelatedProducts/RelatedProducts'
import { useProductList } from './reducers/listCart'
import products from './data/products';
import './App.css'

function App() {

    const [productsList, dispatch] = useProductList();

    const filteredProducts = products.filter( item => {
        return productsList.find(filter => filter.id === item.id) !== undefined;
    })

    const restProducts = products.filter(item => {
        return productsList.every(filter => filter.id !== item.id);
    })
    
    const dataProducts = filteredProducts.map(product => {
        const selectedProduct = productsList.find(item => item.id === product.id);
        if(selectedProduct) {
            return { ...product, amount: selectedProduct.amount }
        } else {
            return { ...product, amount: 1 }
        }
    })

    const amountItems = dataProducts.reduce((acc, item) => {
        return acc + item.amount
    }, 0)

    const subTotal = dataProducts.reduce((acc, item) => {
        return acc + (item.price * item.amount)
    }, 0)

    return (
        <div>
            <header className='h-[72px] flex justify-center border-b-[1px]'>
                <div className='w-[90vw] max-w-[1296px] flex justify-between items-center'>
                    <img className='w-16' src="/logo.svg"/>

                    <div className='w-11 h-11 flex justify-center items-center relative'>
                        <img src="/shopping-cart.svg" alt="" />
                        <div className='w-[14.4px] h-[14.4px] flex items-center justify-center rounded-full bg-[#122E5F] text-[9.6px] text-white absolute top-[3px] right-[3px]'>
                            {amountItems}
                        </div>
                    </div>
                </div>
                
            </header>

            <div className='flex flex-col w-full items-center my-10'>

            { dataProducts.length > 0 ?
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <div className='max-lg:max-w-[820px] max-lg:w-[90vw] flex justify-between max-lg:items-center'>
                    <div className='min-w-[40px] max-w-[40px] h-10 flex justify-center items-center rounded-full bg-[#F2F3F5]'>
                        <img src="/angle-small-left.svg"/>
                    </div>
                    <div className='lg:hidden text-[18px] text-[#3F4E6E] font-medium'>
                        Carrinho
                    </div>
                    <div className='w-[40px] lg:hidden'>

                    </div>
                </div>
                
                <div className='flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8'>
                    <div className='max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]'>
                        { dataProducts.map((item, index) => (
                            <>
                            <CartProduct data={item} amount={item.amount} action={dispatch}/>
                            
                            { index < (dataProducts.length -1) && 
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
                                    <div className='text-[16px] text-[#6D737D]'>{amountItems} Produtos</div>
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
                        
                        { restProducts.length > 0 &&
                            <div className='h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]'>
                                <div className='font-medium text-[18px] text-[#3F4E6E]'>Produtos relacionados</div>

                                { restProducts.map((item, index) => (
                                    <>
                                    <RelatedProducts data={item} action={dispatch}/>
                                    
                                    { index < (restProducts.length -1) && 
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

export default App