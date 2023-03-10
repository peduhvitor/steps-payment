import { useEffect, useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { Context } from "../../contexts/Context"
import { createFakeData } from "./CompleteRegister.utils"
import { DataForm } from "./CompleteRegister.types"

import StatusStep from "../../components/stepsBuy/StatusStep"
import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"

import isEmail from 'validator/lib/isEmail'
import { v4 as uuidv4 } from 'uuid'


const CompleteRegister = () => {
    const pageTitle = 'Completar cadastro'

    const { state, dispatch } = useContext(Context)
    const navigate = useNavigate()
    const { fakeFullName, fakeEmail, fakePassword } = createFakeData()

    
    // Define em qual página estamos para o status step

    useEffect(() => {
        dispatch({ type: 'CHANGE-STEP', payload: { step: 1 } })
    }, [])


    // Caso os produtos não foram adicionados ainda, voltar para a página de carrinho

    useEffect(() => {
        if(!state.order.list[0].id) {
            navigate('/cart')
        }
    }, [])


    // Configurações do formulário

    const { register, handleSubmit, watch, formState: {errors} } = useForm<DataForm>()

    const onSubmit: SubmitHandler<DataForm> = (data) => {
        const { name, email, password } = data
        const id = uuidv4()

        // Cadastro do usuário
        dispatch({
            type: 'CHANGE_DATA_USER',
            payload: { data: { id, name, email, password } }
        })

        // Adiciona o usuário ao pedido
        dispatch({
            type: 'CREATE_ORDER',
            payload: {
                user: { id, name, email }
            }
        })

        setTimeout(() => {
            navigate('/step-buy/add-address')
        }, 200)
    }

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="text-[24px] font-medium text-[#3F4E6E]">{pageTitle}</div>

                        <div className="flex flex-col gap-6 w-full">
                            <label className="input-group">
                                <div className="title">Seu nome completo</div>
                                <input 
                                    type="text"
                                    placeholder="Digite aqui o seu nome"
                                    {...register('name', {
                                        value: `${fakeFullName}`,
                                        required: 'Campo obrigatório',
                                    })}/>
                                    {errors.name && <p className="text-[14px] text-red-500 pl-3">{errors.name.message}</p>}
                            </label>

                            <label className="input-group">
                                <div className="title">Seu email</div>
                                <input 
                                    type="text" 
                                    placeholder="Digite aqui o seu email" 
                                    {...register('email', {
                                        value: `${fakeEmail}`,
                                        required: 'Campo obrigatório',
                                        validate: {
                                            email: (value) => isEmail(value) || 'Email inválido'
                                        }
                                    })}/>
                                    {errors.email && <p className="text-[14px] text-red-500 pl-3">{errors.email.message}</p>}
                            </label>

                            <label className="input-group">
                                <div className="title">Sua senha</div>
                                <input 
                                    type="password" 
                                    placeholder="Digite aqui uma senha" 
                                    {...register('password', {
                                        value: `${fakePassword}`,
                                        required: 'Este campo é obrigatório'
                                    })}/>
                                    {errors.password && <p className="text-[14px] text-red-500 pl-3">{errors.password.message}</p>}
                            </label>

                            <label className="input-group">
                                <div className="title">Repita sua senha</div>
                                <input 
                                    type="password" 
                                    placeholder="Repita sua senha aqui" 
                                    {...register('passwordRepeat', {
                                        value: `${fakePassword}`,
                                        required: true,
                                        validate: (value) => value === watch('password')
                                    })}/>
                                {errors.passwordRepeat && <p className="text-[14px] text-red-500 pl-3">As senhas não combinam</p>}
                            </label>
                        </div>

                        <input type="submit" className='cursor-pointer w-full h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]' value="Próximo"/>
                    </form>
                    
                    <StatusStep/>
                </div>


            </div>
        </div>
    )
}

export default CompleteRegister