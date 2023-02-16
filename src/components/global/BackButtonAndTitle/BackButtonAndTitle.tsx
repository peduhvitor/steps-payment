import { useNavigate } from "react-router-dom"

type Props = {
    title: string,
    link?: string
}

const BackButtonAndTitle = ({ title, link }: Props) => {

    const navigate = useNavigate()

    const handleBackButton = () => {
        link ? navigate(`/${link}`) : navigate(-1)
    }

    return (
        <div onClick={ handleBackButton } className='max-lg:max-w-[820px] max-lg:w-[90vw] flex justify-between max-lg:items-center cursor-pointer'>
            <div className='min-w-[40px] max-w-[40px] h-10 flex justify-center items-center rounded-full bg-[#F2F3F5]'>
                <img src="/angle-small-left.svg" />
            </div>
            <div className='lg:hidden text-[18px] text-[#3F4E6E] font-medium'>
                {title}
            </div>
            <div className='w-[40px] lg:hidden'></div>
        </div>
    )
}

export default BackButtonAndTitle