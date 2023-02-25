import { useEffect, useContext } from "react"
import BackButtonAndTitle from "../../components/global/BackButtonAndTitle/BackButtonAndTitle"
import StatusStep from "../../components/stepsBuy/StatusStep"
import { Context } from "../../contexts/Context"
import { faker } from '@faker-js/faker/locale/pt_BR'


const DetailsOrder = () => {
    const pageTitle = 'Detalhes do pedido'

    const { state } = useContext(Context)

    useEffect(() => {
        console.log(state.order);
    }, [])

    const addressFormat = `${state.order.address.road} ${state.order.address.number}, ${state.order.address.neighborhood}, ${state.order.address.city} ${state.order.address.cep}`

    const defineOrderStatus = () => {
        if(state.order.orderDetails.status === 'preparingForDelivery') {
            return 'Preparando para entrega'
        }

        if(state.order.orderDetails.status === 'pending') {
            return 'Pendente'
        }
    }

    const defineDataByPaymentForm = () => {
        if(state.order.paymentForm.method === 'pix') {
            return {
                method: 'Pix',
                title: 'Falta só mais um passo',
                subtitle: 'Efetue o pagamento usando o QR Code abaixo em alguns segundos estaremos confirmando seu pagamento'
            }
        }

        if(state.order.paymentForm.method === 'ticket') {
            return {
                method: 'Boleto',
                title: 'Falta só mais um passo',
                subtitle: 'Clique no seu boleto abaixo para efetuar o pagamento, e te avisaremos no email assim que confirmado'
            }
        }

        if(state.order.paymentForm.method === 'credit-card') {
            return {
                method: 'Cartão de crédito',
                title: 'Uhull! Pedido confirmado',
                subtitle: 'Agora é só aguardar a confirmação do pagamento no seu email'
            }
        }
    }

    return (
        <div className="flex flex-col w-full items-center my-10">
            <div className='flex max-lg:flex-col max-lg:items-center justify-between max-w-[1296px] w-[90vw] gap-8'>
                <BackButtonAndTitle title={pageTitle}/>

                <div className="flex max-2xl:flex-col max-2xl:items-center max-2xl:w-full flex-1 gap-8">
                    <div className="max-w-[820px] w-full h-min p-6 flex flex-col items-center gap-6 bg-[#F2F3F5] rounded-[40px]">
                        <div className="flex flex-col items-center gap-1">
                            <div className="text-[24px] font-medium text-[#3F4E6E]">{defineDataByPaymentForm()?.title}</div>
                            <div className="text-center w-10/12">{defineDataByPaymentForm()?.subtitle}</div>
                        </div>

                        <div className="flex w-full gap-5 max-sm:flex-col-reverse">
                            <div className="flex flex-col gap-4 border-2 p-7 w-1/3 max-sm:w-full rounded-2xl">
                                <div className="text-[18px] font-medium">Seu pedido é o {state.order.orderDetails.code}</div>

                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col">
                                        <div className="font-medium">Endereço de entrega</div>
                                        <div>{addressFormat}</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="font-medium">Forma de pagamento</div>
                                        <div>{defineDataByPaymentForm()?.method}</div>
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="font-medium">Status do pedido</div>
                                        <div>{defineOrderStatus()}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-7 border-2 p-7 flex-1 rounded-2xl">

                                {state.order.paymentForm.method !== 'credit-card' &&
                                    <div className="text-[18px] font-medium">Efetue o pagamento via {defineDataByPaymentForm()?.method.toLowerCase()}</div>
                                }

                                {state.order.paymentForm.method === 'credit-card' &&
                                    <img className="m-auto" src="/success.svg" alt="" />
                                }

                                {state.order.paymentForm.method === 'pix' &&
                                    <div className="bg-white w-52 h-52 rounded-3xl p-3">
                                        <img src="/qrcode.png" alt="" />
                                    </div>
                                }

                                {state.order.paymentForm.method === 'ticket' &&
                                    <>
                                    <div className="bg-white w-full overflow-hidden h-52 rounded-3xl p-1">
                                        <img src="/ticket.png" alt="" />
                                    </div>

                                    <button className='w-full h-10 px-6 rounded-full bg-[#122E5F] text-white text-[18px]'>
                                        Visualizar boleto
                                    </button>
                                    </>
                                }
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