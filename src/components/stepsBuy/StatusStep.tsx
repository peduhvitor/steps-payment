import { useContext } from "react"
import { Context } from "../../contexts/Context"

const StatusStep = () => {

    const { state } = useContext(Context)

    const activeStyle = {
        completeRegister: state.statusStep.completeRegister ? 'text-[#3F4E6E] font-medium' : 'text-[#6D737D]',
        paymentForm: state.statusStep.paymentForm ? 'text-[#3F4E6E] font-medium' : 'text-[#6D737D]',
        details: state.statusStep.details ? 'text-[#3F4E6E] font-medium' : 'text-[#6D737D]'
    }

    return (
        <div className="h-min flex flex-col gap-6 max-2xl:max-w-[820px] max-2xl:w-full flex-1 p-6 bg-[#F2F3F5] rounded-[40px] text-[#6D737D] text-[18px]">
            <div>
                <div className={ activeStyle.completeRegister }>Complete seu cadastro</div>
                <img src="" alt="" />
            </div>
            <div className="line bg-[#DADFE8]"></div>
            <div>
                <div className={ activeStyle.paymentForm }>Forma de pagamento</div>
                <img src="" alt="" />
            </div>
            <div className="line bg-[#DADFE8]"></div>
            <div>
                <div className={ activeStyle.details }>Detalhes</div>
                <img src="" alt="" />
            </div>
        </div>
    )
}

export default StatusStep