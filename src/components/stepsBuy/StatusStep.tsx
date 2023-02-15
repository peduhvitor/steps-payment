import { useContext } from "react"
import { Context } from "../../contexts/Context"

const StatusStep = () => {

    const { state } = useContext(Context)

    const setStyle = (page: any) => {
        if(page === "accessed") {
            return { 
                title: 'text-[#3F4E6E] font-medium',
                img: 'bg-[#122E5F]'
            }
        } else if(page === 'accessing') {
            return { 
                title: 'text-[#3F4E6E] font-medium',
                img: 'bg-[#ffffff]'
            }
        }

        return { 
            title: 'text-[#6D737D]',
            img: 'bg-[#DADFE8]'
        } 
        
    }

    return (
        <div className="h-min flex flex-col gap-6 max-2xl:max-w-[820px] max-2xl:w-full flex-1 p-6 bg-[#F2F3F5] rounded-[40px] text-[#6D737D] text-[18px]">
            <div>
                <div className={ setStyle(state.statusStep.completeRegister).title }>Complete seu cadastro</div>
                <div className={ `${setStyle(state.statusStep.completeRegister).img} w-6 h-6 rounded-full` }></div>
            </div>
            <div className="line bg-[#DADFE8]"></div>
            <div>
                <div className={ setStyle(state.statusStep.paymentForm).title }>Complete seu cadastro</div>
                <div className={ `${setStyle(state.statusStep.paymentForm).img} w-6 h-6 rounded-full` }></div>
            </div>
            <div className="line bg-[#DADFE8]"></div>
            <div>
                <div className={ setStyle(state.statusStep.details).title }>Complete seu cadastro</div>
                <div className={ `${setStyle(state.statusStep.details).img} w-6 h-6 rounded-full` }></div>
            </div>
        </div>
    )
}

export default StatusStep