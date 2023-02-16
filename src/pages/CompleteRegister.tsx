import { useEffect, useContext  } from "react"
import { Context } from "../contexts/Context"
import BackButtonAndTitle from "../components/global/BackButtonAndTitle/BackButtonAndTitle"
import StatusStep from "../components/stepsBuy/StatusStep"

const CompleteRegister = () => {
    const pageTitle = 'Completar cadastro'

    const { dispatch } = useContext(Context)

    useEffect(() => {
        dispatch({ type: 'CHANGE-STEP', payload: { page: 'completeRegister'} })
    }, [])

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <div className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="text-[24px] font-medium text-[#3F4E6E]">{pageTitle}</div>

                        <div className="flex flex-col gap-6 w-full">
                            <label className="input-group">
                                <div className="title">Seu nome completo</div>
                                <input type="text" placeholder="Digite aqui o seu nome" />
                            </label>

                            <label className="input-group">
                                <div className="title">Seu email</div>
                                <input type="email" placeholder="Digite aqui o seu email" />
                            </label>

                            <label className="input-group">
                                <div className="title">Sua senha</div>
                                <input type="password" placeholder="Digite aqui uma senha" />
                            </label>

                            <label className="input-group">
                                <div className="title">Repita sua senha</div>
                                <input type="password" placeholder="Repita sua senha aqui" />
                            </label>
                        </div>

                        <button className='w-full h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]'>
                            Próximo
                        </button>
                    </div>
                    
                    <StatusStep/>
                </div>


            </div>
        </div>
    )
}

export default CompleteRegister