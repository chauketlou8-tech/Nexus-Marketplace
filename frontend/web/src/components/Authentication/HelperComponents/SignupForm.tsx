import { Lock, Mail, User, CircleAlert } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { setUser } from "../../shared/Types/User.ts";
import type { setBool } from "../../shared/Types/Types.ts";

interface SignupPageProps {
    setLogin?: setBool,
    setSignIn?: setBool,
    setForgotPassword?: setBool,
    setCurrUser?: setUser
}

interface User {
    name: string;
    email: string;
    password: string;
    course: string;
    year: number;
}

export default function SignupForm({ setLogin, setSignIn, setForgotPassword, setCurrUser }: SignupPageProps) {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [course, setCourse] = useState<string>("");
    const [year, setYear] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    //Errors
    const [isError, setIsError] = useState<boolean>(false); //error for incomplete form details

    const createAccount = (e: { preventDefault: () => void; }) : void => {
        e.preventDefault();
        setIsLoading(true);

        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const minLoadingTime = 3500; //minimum loading time in milliseconds (3.5s)
        const startTime = Date.now();

        if (!name || !email || !password || !course || year === 0) {
            setIsLoading(false);
            setIsError(true);

            setTimeout(() => {
                setIsError(false);
            }, 2500);

            return;
        }

        setIsLoading(true);

        const user : User = {
            name,
            email,
            password,
            course,
            year,
        }
        //This is where the account creation goes.
        //mimic by saving to localstorage.
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        //mimic an api call
        const deltaTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - deltaTime;

        setCurrUser?.(user);

        setTimeout(()=> {
            setIsLoading(false);
        }, remainingTime > 0 ? remainingTime : 0);

        setTimeout(()=> {
            navigate(`/Home`);
        }, remainingTime > 0 ? remainingTime + 20 : 0);

    }

    console.log(createAccount);
    console.log(setLogin, setSignIn, setForgotPassword, name, setName, email, password, course, setCourse, year, setYear, setEmail, setPassword);
    return (
        <form noValidate={true} className="flex flex-col items-start justify-center bg-white rounded-[10px] p-[2rem] shadow-lg w-full max-w-[800px] gap-4 relative">
            <div className="flex flex-col">
                <h2 className="text-black text-[22px] font-[600]">Join UCT MarketHub</h2>
                <p className="text-[14px] text-gray-600">Create your account with your UCT email</p>
            </div>

            <div className="flex flex-col items-start justify-center gap-5 w-full">
                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="name" className="text-black text-[14px] font-[500]">Full Name</label>
                    <div className="relative w-full">
                        <User width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]"></User>
                        <input type="text" placeholder="Thabo Mokoena" name="name" id="name" onChange={(e) => setName(e.target.value)} className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[12px] text-gray-600" />
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="email" className="text-black text-[14px] font-[500]">UCT Email</label>
                    <div className="relative w-full">
                        <Mail width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]"></Mail>
                        <input type="email" placeholder="student@myuct.ac.za" name="email" id="email" onChange={(e)=> setEmail(e.target.value)} className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[12px] text-gray-600" />
                    </div>
                </div>

                <div className="flex items-center justify-between w-full gap-1">
                    <div className="flex flex-col items-start justify-center w-full gap-1">
                        <label htmlFor="course" className="text-black text-[14px] font-[500]">Course</label>
                        <div className="relative w-full">
                            <input type="text" placeholder="Computer Science" name="course" id="course" onChange={(e) => setCourse(e.target.value)} className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-3 pr-3 text-[12px] text-gray-600" />
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center w-full gap-1">
                        <label htmlFor="year" className="text-black text-[14px] font-[500]">Year</label>
                        <div className="relative w-full">
                            <input type="number" placeholder="1" name="year" id="year" onChange={(e) => setYear(Number(e.target.value))} className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-3 pr-3 text-[12px] text-gray-600" min={1} />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="password" className="text-black text-[14px] font-[500]">Password</label>
                    <div className="relative w-full">
                        <Lock width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]" />
                        <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[14px] text-gray-600"/>
                    </div>

                </div>
            </div>

            <button onClick={createAccount} className="flex justify-center items-center w-full bg-black text-white rounded-[5px] p-[8px] mt-2 hover:bg-black/80 transition-[0.25s]">
                {isLoading ? (<h2 className="animate-pulse">Creating...</h2>) : (<h2>Create Account</h2>)}
            </button>
            <p className="flex justify-center items-center w-full text-[14px] gap">Don't have an account? <a href="#" className="text-blue-500 font-[600] text-[16px] ml-1" onClick={() => {
                setLogin?.(true);
                setSignIn?.(false);
            }}
            >Sign In</a></p>

            <div  className={`flex justify-start items-center bg-white w-[90%] shadow-lg p-4 rounded-[4px] gap-3 transition-all duration-300 overflow-hidden absolute ${isError ? "opacity-100 bottom-[50px] left-8 h-10" : "opacity-0 bottom-[20px] left-8 h-0 pointer-events-none"}`}>
                <CircleAlert/>
                <h2>Please fill in all the fields</h2>
            </div>
        </form>
    )
}