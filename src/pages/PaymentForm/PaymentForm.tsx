import { useContext, useEffect } from "react"
import { Context } from "../../contexts/Context"
import { useForm, SubmitHandler, Path } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"
import StatusStep from "../../components/stepsBuy/StatusStep"
import './paymentForm.css'

type Form = {
    paymentForm: string,
    nameCard?: string,
    numberCard?: string,
    validity?: string,
    cvc?: string
}

const PaymentForm = () => {

    const pageTitle = 'Forma de pagamento'

    const { dispatch } = useContext(Context)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch({ type: 'CHANGE-STEP', payload: { step: 3 } })
    }, [])


    const { register, handleSubmit, watch, setValue, setError, clearErrors, formState: {errors} } = useForm<Form>();

    useEffect(() => {
        setValue('paymentForm', 'pix')
    }, [])

    const onSubmit: SubmitHandler<Form> = data => {
        const { paymentForm: method, nameCard: name, numberCard: number, validity, cvc } = data

        // Adiciona a forma de pagamento
        dispatch({
            type: 'CREATE_ORDER',
            payload: {
                paymentForm: {
                    method,
                    infoCard: { name, number, validity, cvc }
                }
            }
        })

        const idOrder = uuidv4()

        // Adiciona os detalhes do pedido
        dispatch({
            type: 'CREATE_ORDER',
            payload: {
                orderDetails: {
                    code: idOrder,
                    status: 'pending'
                }
            }
        })

        setTimeout(() => {
            navigate('/step-buy/details-order')
        }, 1000)
    }

    const formatNumberCardInput = (e: any) => {
        let value = e.target.value

        if(value[4] !== ' ' || value[9] !== ' ' || value[14] !== ' ') {
            const formatValue = value.replace(' ', '').replace(' ', '').replace(' ', '').replace(/(\d{1,4})/g, '$1 ').trim()
            setValue('numberCard', formatValue)
        }
    }

    const isMonthValid = (value: any) => {
        const month = Number(value.split('/')[0])
        return month >=1 && month <= 12
    }

    const isYearValid = (value: any) => {
        let currentYear = new Date().getFullYear()

        const year = value.split('/')[1].replace(' ', '')

        if(year.length === 4) {
            return Number(year) >= currentYear
        }

        if(year.length === 2) {
            currentYear = Number(currentYear.toString().slice(-2))
            return Number(year) >= currentYear
        }
    }

    const validateValidityInput = (e: any) => {
        let value = e.target.value

        if(!isMonthValid(value)) {
            setError('validity', {type: 'custom', message: 'M??s inv??lido'})
            return
        }

        if(!isYearValid(value)) {
            setError('validity', {type: 'custom', message: 'Ano inv??lido'})
        }
    }

    const formatValidityCardInput = (e: any) => {
        clearErrors('validity')

        const value = e.target.value

        if(value[2] !== ' ' || value[3] !== '/' || value[4] !== ' ') {
            const formatValue = value.replace(' ', '').replace(' ', '').replace('/', '').replace(/^(\d{2})(\d)/, '$1 / $2')
            setValue('validity', formatValue)
        }
    }

    const formatInputToNumber = (value: string, input: Path<Form>) => {
        const valueToNumber = parseInt(value)
        valueToNumber ? setValue(input, `${valueToNumber}`) : setValue(input, '')
    }
    

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
                                        {...register('paymentForm')} 
                                        type="radio" 
                                        id="pix" 
                                        value='pix' 
                                        checked={watch('paymentForm') === 'pix'}/>

                                    <label htmlFor="pix" className="select-payment-form">Pix</label>

                                    <input 
                                        {...register('paymentForm')} 
                                        type="radio" 
                                        id="ticket" 
                                        value='ticket' 
                                        checked={watch('paymentForm') === 'ticket'}/>

                                    <label htmlFor="ticket" className="select-payment-form">Boleto</label>

                                    <input 
                                        {...register('paymentForm')} 
                                        type="radio" 
                                        id="credit-card" 
                                        value='credit-card' 
                                        checked={watch('paymentForm') === 'credit-card'}/>

                                    <label htmlFor="credit-card" className="select-payment-form">Cart??o de cr??dito</label>
                                </div>
                            </div>

                            { watch('paymentForm') === 'pix' && 
                                <div className="text-center">
                                    Na pr??xima tela efetue o pagamento via pix
                                </div>
                            }

                            { watch('paymentForm') === 'ticket' && 
                                <div className="text-center">
                                    Na pr??xima tela efetue o pagamento via boleto
                                </div>
                            }

                            { watch('paymentForm') === 'credit-card' && 
                                <>
                                <div className="line bg-[#DADFE8]"></div>

                                <label className="input-group">
                                    <div className="title">Nome do titular</div>
                                    <input 
                                        type="text" 
                                        placeholder="Digite o nome que consta no cart??o" 
                                        {...register('nameCard', {
                                            required: 'Campo obrigat??rio'
                                        })}
                                        />
                                        {errors.nameCard && <p className="text-[14px] text-red-500 pl-3">{errors.nameCard.message}</p>}
                                </label>

                                <label className="input-group">
                                    <div className="title">N??mero do cart??o</div>
                                    <input 
                                        type="text" 
                                        placeholder="Digite o n??mero que consta no cart??o" 
                                        maxLength={19}
                                        {...register('numberCard', {
                                            required: 'Campo obrigat??rio',
                                            onChange: e => formatNumberCardInput(e)
                                        })}
                                        />
                                        {errors.numberCard && <p className="text-[14px] text-red-500 pl-3">{errors.numberCard.message}</p>}
                                </label>

                                <div className="double-input">
                                    <label className="input-group">
                                        <div className="title">Expira????o</div>
                                        <input 
                                            type="text" 
                                            placeholder="MM/AAAA"
                                            maxLength={9}
                                            {...register('validity', {
                                                required: 'Campo obrigat??rio',
                                                onBlur: v => validateValidityInput(v),
                                                onChange: e => formatValidityCardInput(e)
                                            })}
                                            />
                                            {errors.validity && <p className="text-[14px] text-red-500 pl-3">{errors.validity.message}</p>}
                                    </label>

                                    <label className="input-group">
                                        <div className="title">CVC</div>
                                        <input 
                                            type="text" 
                                            placeholder="000" 
                                            maxLength={3}
                                            {...register('cvc', {
                                                required: 'Campo obrigat??rio',
                                                onChange: e => formatInputToNumber(e.target.value, 'cvc')
                                            })}
                                            />
                                            {errors.cvc && <p className="text-[14px] text-red-500 pl-3">{errors.cvc.message}</p>}
                                    </label>
                                </div>
                                </>
                            }
                        </div>
                        <button className='w-full h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]'>
                            Pr??ximo
                        </button>
                    </form>
                    
                    <StatusStep/>
                </div>


            </div>
        </div>
    )
}

export default PaymentForm