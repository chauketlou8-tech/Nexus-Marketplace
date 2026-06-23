import type { User as U } from "../../shared/interface.ts";
import { ShieldCheck, User } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoutUser from "../../../api/user/logoutUser.ts";
import UserProfile from "./UserProfile.tsx";
import formatInit from "../../../utils/formatInit.ts";

export default function Profile({ user }: { user: U }) {

    const [isShowProfile, setShowProfile] = useState(false);
    const colors : string[] = ["blue", "green", "purple", "red", "orange", "yellow"];
    const [color] = useState<string>(colors[Math.floor(Math.random() * colors.length)]);

    const navigate = useNavigate();

    const logout = async (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
        //@ts-ignore
        await logoutUser(user?.id);
        navigate("/");
    }

    return (
        user && 'name' in user &&
        <div className="flex justify-between items-center w-full" onClick={() => setShowProfile?.(true)}>
            <span style={{ background: color }} className="flex justify-center items-center w-[20px] h-[20px] rounded-[50%] p-4.5 text-white font-[500]">
                {formatInit(user.name)}
            </span>

            <div>
                <span className="flex justify-between items-center w-full gap-1">
                    <h3 className="text-black text-[14px] font-[600]">{user.name}</h3>
                    <ShieldCheck className="text-blue-700 w-[18px] h-[18px] font-[600]" />
                </span>

                <div className="flex justify-start items-center w-full gap-2">
                    <p className="text-[#666] text-[12px]">Trust: 95%</p>
                    <div className="w-[80px] h-[6px] rounded-[2rem] bg-gray-500/10">
                        <div></div>
                    </div>
                </div>
            </div>

            <User className="text-[#333] w-[18px] h-[18px] font-[600] hover:cursor-pointer" onClick={logout} />
            { isShowProfile && <UserProfile user={user} setShowProfile={setShowProfile}/> }
        </div>
    )
}