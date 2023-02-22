import { useEffect, useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { Context } from "../../contexts/Context"

import StatusStep from "../../components/stepsBuy/StatusStep"
import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"

type Form = {
    cep: string,
    road: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
    state: string
}

const AddAddress = () => {
    const pageTitle = 'Adicione o endereço'

    const { register, handleSubmit, formState: { errors } } = useForm<Form>()

    const onSubmit: SubmitHandler<Form> = (data) => { }

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
                                    {...register('cep', {
                                        required: 'Campo obrigatório',
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
                                            required: 'Campo obrigatório',
                                        })} />
                                    {errors.number && <p className="text-[14px] text-red-500 pl-3">{errors.number.message}</p>}
                                </label>
                            </div>

                            <label className="input-group">
                                <div className="title">Complemento</div>
                                <input
                                    type="text"
                                    placeholder="Ex.: Próximo ao mercado"
                                    {...register('complement', {
                                        required: 'Campo obrigatório',
                                    })} />
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

                            <div className="double-input">
                                <label className="input-group">
                                    <div className="title">Cidade</div>
                                    <input
                                        type="text"
                                        {...register('city', {
                                            value: `Insira o Cep para preencher a cidade`,
                                            required: 'Campo obrigatório',
                                        })} />
                                    {errors.city && <p className="text-[14px] text-red-500 pl-3">{errors.city.message}</p>}
                                </label>

                                <label className="input-group">
                                    <div className="title">Estado</div>
                                    <input
                                        type="text"
                                        {...register('state', {
                                            value: `Insira o Cep para preencher o estado`,
                                            required: 'Campo obrigatório'
                                        })} />
                                    {errors.state && <p className="text-[14px] text-red-500 pl-3">{errors.state.message}</p>}
                                </label>
                            </div>
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