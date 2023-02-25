import { useEffect, useContext } from "react"
import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"
import StatusStep from "../../components/stepsBuy/StatusStep"
import { Context } from "../../contexts/Context"


const DetailsOrder = () => {
    const pageTitle = 'Detalhes do pedido'

    const { state } = useContext(Context)

    useEffect(() => {
        console.log(state.order);
    })

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <div className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="flex flex-col items-center gap-1">
                            <div className="text-[24px] font-medium text-[#3F4E6E]">Uhull! Pedido confirmado</div>
                            <div>Agora é só aguardar a confirmação do pagamento no seu email</div>
                        </div>

                        <div className="flex w-full gap-5 max-sm:flex-col-reverse">
                            <div className="flex flex-col gap-4 border-2 p-7 w-1/3 max-sm:w-full rounded-2xl">
                                <div className="text-[18px] font-medium">Seu pedido é o #564156455</div>

                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col">
                                        <div className="font-medium">Endereço de entrega</div>
                                        <div>endereço</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="font-medium">Forma de pagamento</div>
                                        <div>Cartão de crédito</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="font-medium">Status do pedido</div>
                                        <div>Preparando para entrega</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-7 border-2 p-7 flex-1 rounded-2xl">
                                <div className="text-[18px] font-medium">Efetue o pagamento via</div>

                                <div className="bg-white w-52 h-52 rounded-3xl p-3">
                                    <img src="" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <StatusStep/>
                </div>


            </div>
        </div>
    )
}

export default DetailsOrder