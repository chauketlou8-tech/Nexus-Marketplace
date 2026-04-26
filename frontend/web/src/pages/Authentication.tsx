import { useState } from "react";
import LoginPage from "../components/Authentication/LoginPage.tsx";
import SignupPage from "../components/Authentication/SignupPage.tsx";
import ForgotPasswordPage from "../components/Authentication/ForgotPassword.tsx";
import type { setUser } from "../components/shared/Types/User.ts";

export default function Authentication({ setCurrUser } : { setCurrUser: setUser }) {
    const [isLogin, setLogin] = useState(true);
    const [isSignIn, setSignIn] = useState(false);
    const [isForgotPassword, setForgotPassword] = useState(false);

    if (isLogin) return <LoginPage setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword} setCurrUser={setCurrUser} />
    else if(isSignIn) return <SignupPage setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword} setCurrUser={setCurrUser} />
    else if (isForgotPassword) return <ForgotPasswordPage setLogin={setLogin} setSignIn={setSignIn} setForgotPassword={setForgotPassword}/>
}