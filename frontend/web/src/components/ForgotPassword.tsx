interface ForgotPasswordPageProps {
    setLogin?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSignIn?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setForgotPassword?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function ForgotPasswordPage({setLogin, setSignIn, setForgotPassword}: ForgotPasswordPageProps) {
    console.log(setLogin, setSignIn, setForgotPassword)
    return (
        "This is the forgot password page."
    )
}