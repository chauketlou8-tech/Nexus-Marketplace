interface SignupPageProps {
    setLogin?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSignIn?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setForgotPassword?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function SignupPage({setLogin, setSignIn, setForgotPassword}: SignupPageProps) {
    console.log(setLogin, setSignIn, setForgotPassword);
    return (
        <h2>Welcome to the nexus-Marketplace signup page.</h2>
    )
}