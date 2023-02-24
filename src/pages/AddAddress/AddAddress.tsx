import { useEffect, useContext, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import { Context } from "../../contexts/Context"

import StatusStep from "../../components/stepsBuy/StatusStep"
import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"

type Form = {
    cep: string,
    road: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string
}

type cepInfo = {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string
}

const getInfoByCep = async (cep: string) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const AddAddress = () => {
    const pageTitle = 'Adicione o endereço'

    const { dispatch } = useContext(Context)

    const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm<Form>()

    const makeReqCep = async (cep: any) => {
        let value = cep.target.value

        if(!value.includes('-')) {
            if(value.length === 8) {
                const data: cepInfo = await getInfoByCep(value)

                data.cep ? setValue('cep', data.cep) : setError('cep', {type: 'custom', message: 'Cep inexistente'})
    
                setValue('road', data.logradouro)
                setValue('complement', data.complemento)
                setValue('neighborhood', data.bairro)
                if(data.localidade && data.uf) {
                    setValue('city', `${data.localidade}, ${data.uf}`)
                }
            } else if(value.length > 0) {
                setError('cep', { type: 'custom', message: 'Cep inválido' })
            }
        }
    }

    const formatInputCep = (e: any) => {
        clearErrors('cep')

        let value = e.target.value

        if(value.length === 8) {
            makeReqCep(e)
        }

        if(value.includes('-')) {
            value = value.replace('-', '')
            reset() // limpa os outros campos ao manusear o cep após preenchido
        }

        value = parseInt(value)
        value ? setValue('cep', `${value}`) : setValue('cep', '')
    }

    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Form> = (data) => { 
        const { cep, road, number, complement, neighborhood, city } = data

        dispatch({
            type: 'CREATE_ORDER',
            payload: {
                address: { cep, road, number, complement, neighborhood, city }
            }
        })

        setTimeout(() => {
            navigate('/step-buy/payment-form')
        }, 200)
    }

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle} />

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="text-[24px] font-medium text-[#3F4E6E]">{pageTitle}</div>
                        <div className="flex flex-col gap-6 w-full">
                            <label className="input-group">
                                <div className="title">CEP</div>
                                <input
                                    type="text"
                                    placeholder="Ex.: 40548848"
                                    maxLength={8}
                                    {...register('cep', {
                                        required: 'Campo obrigatório',
                                        minLength: { value: 8, message:'Cep inválido' },
                                        onBlur: async (value) => await makeReqCep(value),
                                        onChange: e => formatInputCep(e)
                                    })} />
                                {errors.cep && <p className="text-[14px] text-red-500 pl-3">{errors.cep.message}</p>}
                            </label>

                            <div className="double-input">
                                <label className="input-group">
                                    <div className="title">Rua</div>
                                    <input
                                        type="text"
                                        placeholder="Ex.: Rua fulano de tal"
                                        {...register('road', {
                                            required: 'Campo obrigatório',
                                        })} />
                                    {errors.road && <p className="text-[14px] text-red-500 pl-3">{errors.road.message}</p>}
                                </label>

                                <label className="input-group w-56">
                                    <div className="title">número</div>
                                    <input
                                        type="text"
                                        placeholder="Ex.: 541"
                                        {...register('number', {
                                            required: 'Campo obrigatório'
                                        })} />
                                    {errors.number && <p className="text-[14px] text-red-500 pl-3">{errors.number.message}</p>}
                                </label>
                            </div>

                            <label className="input-group">
                                <div className="title">Complemento (opcional)</div>
                                <input
                                    type="text"
                                    placeholder="Ex.: Próximo ao mercado"
                                    {...register('complement')} />
                                {errors.complement && <p className="text-[14px] text-red-500 pl-3">{errors.complement.message}</p>}
                            </label>

                            <label className="input-group">
                                <div className="title">Bairro</div>
                                <input
                                    type="text"
                                    placeholder="Ex.: Bairro novo"
                                    {...register('neighborhood', {
                                        required: 'Campo obrigatório',
                                    })} />
                                {errors.neighborhood && <p className="text-[14px] text-red-500 pl-3">{errors.neighborhood.message}</p>}
                            </label>

                            <label className="input-group">
                                <div className="title">Cidade</div>
                                <input
                                    type="text"
                                    disabled={true}
                                    {...register('city', {
                                        value: `Insira o Cep para preencher a cidade`,
                                        required: 'Campo obrigatório'
                                    })} />
                                {errors.city && <p className="text-[14px] text-red-500 pl-3">{errors.city.message}</p>}
                            </label>
                        </div>

                        <input type="submit" className='cursor-pointer w-full h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]' value="Próximo" />
                    </form>

                    <StatusStep />
                </div>

            </div>
        </div>
    )
}

export default AddAddress