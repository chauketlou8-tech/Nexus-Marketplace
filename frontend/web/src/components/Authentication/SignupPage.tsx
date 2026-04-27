import WelcomePage from "./HelperComponents/WelcomePage.tsx";
import SignupForm from "./HelperComponents/SignupForm.tsx";
import type { setUser } from "../shared/Types/User.ts";
import type { setBool } from "../shared/Types/Types.ts";

interface SignupPageProps {
    setLogin?: setBool,
    setSignIn?: setBool,
    setForgotPassword?: setBool,
    setCurrUser?: setUser
}

export default function SignupPage({setLogin, setSignIn, setForgotPassword, setCurrUser}: SignupPageProps) {
    return (
        <div className="flex items-center justify-between bg-blue-50/20 rounded-[2rem] p-[2rem] px-[8rem] gap-5 w-full min-h-screen">
            <WelcomePage/>
            <SignupForm setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword} setCurrUser={setCurrUser}/>
        </div>
    )
}