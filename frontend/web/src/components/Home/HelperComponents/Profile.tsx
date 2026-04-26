import type { User as U } from "../../shared/Types/User.ts";
import { ShieldCheck, User } from "lucide-react"

export default function Profile({ user }: { user: U }) {

    const colors : string[] = ["blue", "green", "purple", "red", "orange", "yellow"]

    function formatInit() : string {
        if (user && 'name' in user) {
            const name = user.name;
            const splitName : string[] = name.split(' ');
            let initials : string = "";

            if (splitName.length == 1) {
                initials += splitName[0].charAt(0).toUpperCase() + splitName[0].charAt(1).toUpperCase();
            }

            else if (splitName.length >= 2) {
                initials += splitName[0].charAt(0).toUpperCase() + splitName[splitName.length - 1].charAt(0).toUpperCase();
            }

            return initials;
        }

        return "";
    }



    return (
        user && 'name' in user &&
        <div className="flex justify-between items-center w-full">
            <span style={{ background: colors[Math.floor((Math.random() * colors.length))] }} className="flex justify-center items-center w-[20px] h-[20px] rounded-[50%] p-4.5 text-white font-[500]">
                {formatInit()}
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

            <User className="text-[#333] w-[18px] h-[18px] font-[600] hover:cursor-pointer" />
        </div>
    )
}