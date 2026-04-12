import { Mail, Lock } from "lucide-react"

// @ts-ignore
interface LoginPageProps {
    setLogin?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setSignIn?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    setForgotPassword?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
}

export default function Form({ setLogin, setSignIn, setForgotPassword }: LoginPageProps){
    console.log(setForgotPassword)
    return (
        <form noValidate={true} className="flex flex-col items-start justify-center bg-white rounded-[10px] p-[2rem] shadow-lg w-full max-w-[800px] gap-4">
            <div className="flex flex-col">
                <h2 className="text-black text-[22px] font-[600]">Welcome Back</h2>
                <p className="text-[14px] text-gray-600">Sign in to your account</p>
            </div>

            <div className="flex flex-col items-start justify-center gap-5 w-full">
                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="email" className="text-black text-[14px] font-[500]">UCT Email</label>
                    <div className="relative w-full">
                        <Mail width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]"></Mail>
                        <input type="email" placeholder="student@myuct.ac.za" name="email" id="email" className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[12px] text-gray-600" />
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center w-full gap-1">
                    <label htmlFor="password" className="text-black text-[14px] font-[500]">Password</label>
                    <div className="relative w-full">
                        <Lock width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]" />
                        <input type="password" name="password" id="password" placeholder="••••••••" className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[14px] text-gray-600"/>
                    </div>

                </div>
            </div>

            <button className="flex justify-center items-center w-full bg-black text-white rounded-[5px] p-[8px] mt-2">Sign in</button>
            <p className="flex justify-center items-center w-full text-[14px] gap">Don't have an account? <a href="#" className="text-blue-500 font-[600] text-[16px] ml-1" onClick={() => {
                setLogin?.(false);
                setSignIn?.(true);
            }}
            >Sign Up</a></p>
        </form>
    )
}