import { useContext, useEffect } from "react"
import { Context } from "../../contexts/Context"
import { useForm, SubmitHandler } from "react-hook-form"

import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"
import StatusStep from "../../components/stepsBuy/StatusStep"
import './paymentForm.css'


const PaymentForm = () => {

    const pageTitle = 'Forma de pagamento'

    const { dispatch } = useContext(Context)

    useEffect(() => {
        dispatch({
            type: 'CHANGE-STEP',
            payload: { page: 'paymentForm' }
        })
    }, [])


    const { register, handleSubmit, watch, setValue } = useForm();

    useEffect(() => {
        setValue('payment-form', 'pix')
    }, [])

    const onSubmit = (data: any) => console.log(data);
    

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="text-[24px] font-medium text-[#3F4E6E]">{pageTitle}</div>

                        <div className="flex flex-col gap-8 w-full">
                            <div className="select-payment flex flex-col gap-4">
                                <div className="text-[#848B99] pl-[10px]">Forma de pagamento</div>

                                <div className="flex gap-5">
                                    <input 
                                        {...register('payment-form')} 
                                        type="radio" 
                                        id="pix" 
                                        value='pix' 
                                        checked={watch('payment-form') === 'pix'}/>

                                    <label htmlFor="pix" className="select-payment-form">Pix</label>

                                    <input 
                                        {...register('payment-form')} 
                                        type="radio" 
                                        id="ticket" 
                                        value='ticket' 
                                        checked={watch('payment-form') === 'ticket'}/>

                                    <label htmlFor="ticket" className="select-payment-form">Boleto</label>

                                    <input 
                                        {...register('payment-form')} 
                                        type="radio" 
                                        id="credit-card" 
                                        value='credit-card' 
                                        checked={watch('payment-form') === 'credit-card'}/>

                                    <label htmlFor="credit-card" className="select-payment-form">Cartão de crédito</label>
                                </div>
                            </div>

                            { watch('payment-form') === 'pix' && 
                                <div className="text-center">
                                    Na próxima tela efetue o pagamento via pix
                                </div>
                            }

                            { watch('payment-form') === 'ticket' && 
                                <div className="text-center">
                                    Na próxima tela efetue o pagamento via boleto
                                </div>
                            }

                            { watch('payment-form') === 'credit-card' && 
                                <>
                                <div className="line bg-[#DADFE8]"></div>

                                <label className="input-group">
                                    <div className="title">Nome do titular</div>
                                    <input type="text" placeholder="Digite o nome que consta no cartão" />
                                </label>

                                <label className="input-group">
                                    <div className="title">Número do cartão</div>
                                    <input type="text" placeholder="Digite o número que consta no cartão" />
                                </label>

                                <div className="double-input">
                                    <label className="input-group">
                                        <div className="title">Expiração</div>
                                        <input type="text" placeholder="MM/AAAA" />
                                    </label>

                                    <label className="input-group">
                                        <div className="title">CVC</div>
                                        <input type="text" placeholder="000" />
                                    </label>
                                </div>
                                </>
                            }
                        </div>
                        <button className='w-full h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]'>
                            Próximo
                        </button>
                    </form>
                    
                    <StatusStep/>
                </div>


            </div>
        </div>
    )
}

export default PaymentForm