import WelcomePage from "./HelperComponents/WelcomePage.tsx";
import Form from "./HelperComponents/LoginForm.tsx"

interface LoginPageProps {
    setLogin?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSignIn?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setForgotPassword?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function LoginPage({setLogin, setSignIn, setForgotPassword}: LoginPageProps) {
    return (
        <div
            className="flex items-center justify-between bg-blue-50/20 rounded-[2rem] p-[2rem] px-[8rem] gap-5 w-full min-h-screen">
            <WelcomePage/>
            <Form setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword}/>
        </div>
    )
}