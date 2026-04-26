import { Mail, Lock, CircleAlert } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { setUser } from "../../shared/Types/User.ts";
import type { setBool } from "../../shared/Types/Types.ts";
import type { User } from "../../shared/Types/interface.ts";

interface LoginPageProps {
    setLogin?: setBool,
    setSignIn?: setBool,
    setForgotPassword?: setBool,
    setCurrUser?: setUser
}

export default function Form({ setLogin, setSignIn, setCurrUser }: LoginPageProps){
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isError, setIsError] = useState<boolean>(false);
    const [is404Error, setIs404Error] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const login = (e: { preventDefault: () => void; }) : void => {
        e.preventDefault();
        setIsLoading(true);
        setIs404Error(false);//to stop the typescript notes

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const minLoadingTime = 3500; //minimum loading time in milliseconds (3.5s)
        const startTime = Date.now();

        if (!email || !password) {
            setIsLoading(false);
            setIsError(true);

            setTimeout(() => {
                setIsError(false);
            }, 2500);

            return;
        }

        if (!users.length) {
            setIsLoading(false);
            setIs404Error(true);

            setTimeout(() => {
                setIs404Error(false);
            }, 2500);

            return;
        }

        let foundUser : boolean = false;
        let currUser = {};

        users.forEach((user: User) => {
            if (user.email === email) {
                foundUser = true;
                currUser = user;
            }
        });

        if (!foundUser) {
            setIsLoading(false);
            setIs404Error(true);

            setTimeout(() => {
                setIs404Error(false);
            }, 2500);

            return;
        }

        //mimic an api call
        const deltaTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - deltaTime;

        setCurrUser?.(currUser);

        setTimeout(()=> {
            setIsLoading(false);
        }, remainingTime > 0 ? remainingTime : 0);

        setTimeout(()=> {
            navigate(`/Home`);
        }, remainingTime > 0 ? remainingTime + 20 : 0);
    }

    return (
        <form noValidate={true} className="flex flex-col items-start justify-center bg-white rounded-[10px] p-[2rem] shadow-lg w-full max-w-[800px] gap-4 relative">
            <div className="flex flex-col">
                <h2 className="text-black text-[22px] font-[600]">Welcome Back</h2>
                <p className="text-[14px] text-gray-600">Sign in to your account</p>
            </div>

            <div className="flex flex-col items-start justify-center gap-5 w-full">
                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="email" className="text-black text-[14px] font-[500]">UCT Email</label>
                    <div className="relative w-full">
                        <Mail width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]"></Mail>
                        <input type="email" placeholder="student@myuct.ac.za" name="email" id="email" onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[12px] text-gray-600" />
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="password" className="text-black text-[14px] font-[500]">Password</label>
                    <div className="relative w-full">
                        <Lock width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]" />
                        <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[14px] text-gray-600"/>
                    </div>

                </div>
            </div>

            <button onClick={login} className="flex justify-center items-center w-full bg-black text-white rounded-[5px] p-[8px] mt-2 hover:bg-black/80 transition-[0.25s]">
                {isLoading ? (<h2 className="animate-pulse">Logging in...</h2>) : (<h2>Sign in</h2>)}
            </button>
            <p className="flex justify-center items-center w-full text-[14px] gap">Don't have an account? <a href="#" className="text-blue-500 font-[600] text-[16px] ml-1" onClick={() => {
                setLogin?.(false);
                setSignIn?.(true);
            }}
            >Sign Up</a></p>

            <div  className={`flex justify-start items-center bg-white w-[90%] shadow-lg p-4 rounded-[4px] gap-3 transition-all duration-300 overflow-hidden absolute ${isError ? "opacity-100 bottom-[50px] left-8 h-10" : "opacity-0 bottom-[20px] left-8 h-0 pointer-events-none"}`}>
                <CircleAlert/>
                <h2>Please fill in all the fields</h2>
            </div>

            <div  className={`flex justify-start items-center bg-white w-[90%] shadow-lg p-4 rounded-[4px] gap-3 transition-all duration-300 overflow-hidden absolute ${is404Error ? "opacity-100 bottom-[50px] left-8 h-10" : "opacity-0 bottom-[20px] left-8 h-0 pointer-events-none"}`}>
                <CircleAlert/>
                <h2>Invalid email or password</h2>
            </div>
        </form>
    )
}