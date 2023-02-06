import { Product } from "../../globalTypes/Product";
import { ProductAction } from "../../reducers/listCart";
import AmountSelect from "../AmountSelect/AmountSelect";

type Props = {
    data: Product,
    amount: number,
    action: ({}:ProductAction) => void
}

const CartProduct = ({data, amount, action}: Props) => {

    return (
        <div className="w-full flex gap-8">
            <div className="min-w-[88px] w-[88px] h-[88px] flex items-center justify-center rounded-xl shadow-xl bg-white overflow-hidden">
                <img className="w-3/4" src={data.img} alt="" />
            </div>
            <div className="flex sm:justify-between max-sm:flex-col max-sm:items-start sm:items-center flex-1 gap-4">
                <div className="flex flex-col gap-1">
                    <div className="text-[18px] text-[#3F4E6E]">
                        { data.name.length > 48 ? data.name.substring(0, 48).trim()+'...' : data.name}
                    </div>
                    <div className="text-[18px] text-[#293652] font-medium"><span className="text-[14px]">R$</span>{ data.price.toLocaleString('pt-BR', {minimumFractionDigits: 2}) }</div>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <div className="text-[14px] text-[#6D737D]">Quantidade</div>
                    <AmountSelect id={data.id} amount={amount} action={action}/>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;