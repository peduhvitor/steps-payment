import { useContext } from "react"
import { Context } from "../../contexts/Context"
import { setStyle } from "../../utils/statusStepFunctions"

const StatusStep = () => {
    const { state } = useContext(Context)
    
    return (
        <div className="h-min flex flex-col gap-6 max-2xl:max-w-[820px] max-2xl:w-full flex-1 p-6 bg-[#F2F3F5] rounded-[40px] text-[#6D737D] text-[18px]">
            <div className="flex justify-between items-center">
                <div className={ setStyle(state.statusStep.step1).title }>Complete seu cadastro</div>
                <div className={ `${setStyle(state.statusStep.step1).img} w-6 h-6 rounded-full` }></div>
            </div>

            <div className="line bg-[#DADFE8]"></div>

            <div className="flex justify-between items-center">
                <div className={ setStyle(state.statusStep.step2).title }>Defina o endereço</div>
                <div className={ `${setStyle(state.statusStep.step2).img} w-6 h-6 rounded-full` }></div>
            </div>

            <div className="line bg-[#DADFE8]"></div>

            <div className="flex justify-between items-center">
                <div className={ setStyle(state.statusStep.step3).title }>Forma de pagamento</div>
                <div className={ `${setStyle(state.statusStep.step3).img} w-6 h-6 rounded-full` }></div>
            </div>

            <div className="line bg-[#DADFE8]"></div>

            <div className="flex justify-between items-center">
                <div className={ setStyle(state.statusStep.step4).title }>Detalhes do pedido</div>
                <div className={ `${setStyle(state.statusStep.step4).img} w-6 h-6 rounded-full` }></div>
            </div>
        </div>
    )
}

export default StatusStep