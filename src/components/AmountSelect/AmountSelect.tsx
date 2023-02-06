import { ProductAction } from "../../reducers/listCart"

type Props = {
    id: string,
    amount: number,
    action: ({}:ProductAction) => void
}

type SetAmountType = {
    type: 'ADD' | 'MINUS' | 'EDIT',
    value?: number
} 

const AmountSelect = ({id, amount, action}: Props) => {

    const setAmount = (set: SetAmountType) => {
        let value: number = amount;

        switch(set.type) {
            case 'ADD':
                value++;
            break;
            case 'MINUS':
                if(amount === 1) {
                    action({type:'REMOVE', payload: {id:id}})
                }
                value--;
            break;
            case 'EDIT':
                if(set.value) {
                    if(set.value >= 1) {
                        value = set.value
                    }
                } else {
                    value = 1
                }
        }

        action({
            type: 'SET_AMOUNT',
            payload: {
                id: id,
                amount: value
            }
        })
    }

    return (
        <div className="w-[102px] flex justify-between items-center">
            <button 
                onClick={() => setAmount({type: 'MINUS'})}
                className="min-w-[32px] h-6 flex items-center justify-center
                    shadow-[4px_5px_29px_rgba(18,46,95,0.1)]
                    bg-white rounded-full">
                <img src="/minus.svg" alt="" />
            </button>
            <input 
                onChange={(e) => setAmount({type: "EDIT", value: Number(e.target.value)})}
                className="w-full text-center bg-transparent text-[16px] 
                        text-[#122E5F]" 
                type="text" 
                value={amount} />
            <button 
                onClick={() => setAmount({type: 'ADD'})}
                className="min-w-[32px] h-6 flex items-center justify-center
                    shadow-[4px_5px_29px_rgba(18,46,95,0.1)]
                    bg-white rounded-full">
                <img src="/plus.svg" alt="" />
            </button>
        </div>
    )
}

export default AmountSelect