import { Link } from "react-router-dom"

type Props = {
    title: string,
    link: string
}

const BackButtonAndTitle = ({ title, link }: Props) => {
    return (
        <Link to={`/${link}`}>
            <div className='max-lg:max-w-[820px] max-lg:w-[90vw] flex justify-between max-lg:items-center'>
                <div className='min-w-[40px] max-w-[40px] h-10 flex justify-center items-center rounded-full bg-[#F2F3F5]'>
                    <img src="/angle-small-left.svg" />
                </div>
                <div className='lg:hidden text-[18px] text-[#3F4E6E] font-medium'>
                    {title}
                </div>
                <div className='w-[40px] lg:hidden'></div>
            </div>
        </Link>
    )
}

export default BackButtonAndTitle