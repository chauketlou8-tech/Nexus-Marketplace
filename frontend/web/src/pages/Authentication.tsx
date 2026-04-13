import { useState } from "react";
import LoginPage from "../components/Authentication/LoginPage.tsx";
import SignupPage from "../components/Authentication/SignupPage.tsx";
import ForgotPasswordPage from "../components/Authentication/ForgotPassword.tsx";

export default function Authentication() {
    const [isLogin, setLogin] = useState(true);
    const [isSignIn, setSignIn] = useState(false);
    const [isForgotPassword, setForgotPassword] = useState(false);

    if (isLogin) return <LoginPage setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword} />
    else if(isSignIn) return <SignupPage setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword} />
    else if (isForgotPassword) return <ForgotPasswordPage setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword}/>
}