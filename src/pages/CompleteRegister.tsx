import { useEffect, useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import isEmail from 'validator/lib/isEmail';
import { Context } from "../contexts/Context"
import BackButtonAndTitle from "../components/global/BackButtonAndTitle/BackButtonAndTitle"
import StatusStep from "../components/stepsBuy/StatusStep"

type DataForm = {
    name: string,
    email: string,
    password: string,
    passwordRepeat: string
}

const CompleteRegister = () => {
    const pageTitle = 'Completar cadastro'

    const { state, dispatch } = useContext(Context)

    useEffect(() => {
        dispatch({ type: 'CHANGE-STEP', payload: { page: 'completeRegister'} })
    }, [])
    

    const { register, handleSubmit, watch, formState: {errors} } = useForm<DataForm>()
    const navigate = useNavigate();

    const password = watch('password')
    const passwordRepeat = watch('passwordRepeat')

    const onSubmit: SubmitHandler<DataForm> = (data) => {
        const { name, email, password } = data

        dispatch({
            type: 'CHANGE_DATA_USER',
            payload: { data: { name, email, password } }
        })

        setTimeout(() => {
                navigate('/step-buy/payment-form')
        }, 200)
        
    }

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="text-[24px] font-medium text-[#3F4E6E]">{pageTitle}</div>
                        <div>{state.userInfo.basicsInfo.name}</div>

                        <div className="flex flex-col gap-6 w-full">
                            <label className="input-group">
                                <div className="title">Seu nome completo</div>
                                <input 
                                    type="text"
                                    placeholder="Digite aqui o seu nome" 
                                    {...register('name', {
                                        required: true,
                                    })}/>
                            </label>

                            <label className="input-group">
                                <div className="title">Seu email</div>
                                <input 
                                    type="text" 
                                    placeholder="Digite aqui o seu email" 
                                    {...register('email', {
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
                                        required: true,
                                        validate: (value) => value === password
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