import WelcomePage from "./HelperComponents/WelcomePage.tsx";
import Form from "./HelperComponents/LoginForm.tsx"
import type { setUser } from "../shared/Types/User.ts";
import type {setBool} from "../shared/Types/Types.ts";

interface LoginPageProps {
    setLogin?: setBool,
    setSignIn?: setBool,
    setForgotPassword?: setBool
    setCurrUser?: setUser
}

export default function LoginPage({setLogin, setSignIn, setForgotPassword, setCurrUser}: LoginPageProps) {
    return (
        <div className="flex items-center justify-between bg-blue-50/20 rounded-[2rem] p-[2rem] px-[8rem] gap-5 w-full min-h-screen">
            <WelcomePage/>
            <Form setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword} setCurrUser={setCurrUser}/>
        </div>
    )
}