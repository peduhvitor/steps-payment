const CompleteRegisterVerify = ({children}: React.PropsWithChildren) => {
    const logged = false
    
    return <>{logged ? "Você já está logado" : children}</>
}

export default CompleteRegisterVerify