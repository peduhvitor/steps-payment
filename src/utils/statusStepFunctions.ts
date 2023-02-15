export const setStyle = (page: string) => {
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