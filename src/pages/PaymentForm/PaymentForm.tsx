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

    const formatNumberCardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        const value = input.value
        const key = e.key

        if(/\d/.test(key) || key === 'Backspace') {
            if((value.length === 4 || value.length === 9 || value.length === 14) && key !== 'Backspace') {
                setValue('numberCard', `${value} `)
            }
            return
        }

        // Função nativa que evita que a tecla pressionada seja exibida no input
        e.preventDefault()
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
            setError('validity', {type: 'custom', message: 'Mês inválido'})
            return
        }

        if(!isYearValid(value)) {
            setError('validity', {type: 'custom', message: 'Ano inválido'})
        }
    } 

    const formatValidityCardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement
        const value = input.value
        const key = e.key

        clearErrors('validity')

        if(/\d/.test(key) || key === 'Backspace' || key === 'ArrowRight' || key === 'ArrowLeft') {
            if(value.length === 2 && key !== 'Backspace') {
                setValue('validity', `${value} / `)
            }
     
            if(value.length === 5 && key === 'Backspace') {
                setValue('validity', `${value[0]}${value[1]}${value[2]}`)
            }
            return
        }

        // Função nativa que evita que a tecla pressionada seja exibida no input
        e.preventDefault()
    }

    const formatRealTimeValidity = (e: any) => {
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

                                    <label htmlFor="credit-card" className="select-payment-form">Cartão de crédito</label>
                                </div>
                            </div>

                            { watch('paymentForm') === 'pix' && 
                                <div className="text-center">
                                    Na próxima tela efetue o pagamento via pix
                                </div>
                            }

                            { watch('paymentForm') === 'ticket' && 
                                <div className="text-center">
                                    Na próxima tela efetue o pagamento via boleto
                                </div>
                            }

                            { watch('paymentForm') === 'credit-card' && 
                                <>
                                <div className="line bg-[#DADFE8]"></div>

                                <label className="input-group">
                                    <div className="title">Nome do titular</div>
                                    <input 
                                        type="text" 
                                        placeholder="Digite o nome que consta no cartão" 
                                        {...register('nameCard', {
                                            required: 'Campo obrigatório'
                                        })}
                                        />
                                        {errors.nameCard && <p className="text-[14px] text-red-500 pl-3">{errors.nameCard.message}</p>}
                                </label>

                                <label className="input-group">
                                    <div className="title">Número do cartão</div>
                                    <input 
                                        type="text" 
                                        placeholder="Digite o número que consta no cartão" 
                                        maxLength={19}
                                        onKeyDown={formatNumberCardInput}
                                        {...register('numberCard', {
                                            required: 'Campo obrigatório'
                                        })}
                                        />
                                        {errors.numberCard && <p className="text-[14px] text-red-500 pl-3">{errors.numberCard.message}</p>}
                                </label>

                                <div className="double-input">
                                    <label className="input-group">
                                        <div className="title">Expiração</div>
                                        <input 
                                            type="text" 
                                            placeholder="MM/AAAA" 
                                            onKeyDown={formatValidityCardInput}
                                            maxLength={9}
                                            {...register('validity', {
                                                required: 'Campo obrigatório',
                                                onBlur: v => validateValidityInput(v),
                                                onChange: e => formatRealTimeValidity(e)
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
                                                required: 'Campo obrigatório',
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