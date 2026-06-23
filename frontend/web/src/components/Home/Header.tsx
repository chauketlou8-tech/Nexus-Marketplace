import SearchBar from "./HelperComponents/SearchBar.tsx";
import { Bell, Settings, Plus } from "lucide-react";
import type { User, Notification } from "../shared/interface.ts";
import type { setString } from "../shared/types.ts";
import formatInit from "../../utils/formatInit.ts";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    tab?: string
    search?: string
    setTab?: setString
    setSearch?: setString
    user: User
    notifications: Notification[]
}

export default function Header({ search, setSearch, user, notifications, setTab }: HeaderProps) {

    const is_new_notifications = notifications.length > 0 && notifications.some(notification => !notification.is_read);
    const navigate = useNavigate();

    return (
        <div className="flex justify-start items-center w-[81%] px-4 py-2 gap-5 fixed top-0 left-[19%] h-[80px] bg-black border-b border-gray-200 z-[9999999999] overflow-hidden">
            <SearchBar search={search} setSearch={setSearch} />

            <div className="flex justify-center items-center gap-1 bg-orange-400/10 px-4 py-2 rounded-[10px]" onClick={() => navigate("/listItem")}>
                <Plus width={16} height={16} className="text-orange-300"/>
                <p className="text-orange-300 font-[500] text-[14px]">Add item</p>
            </div>

            <div className="flex justify-center items-center relative text-white cursor-pointer hover:bg-gray-100/10 p-4 rounded-[5px]" onClick={() => setTab?.("notifications")}>
                {is_new_notifications && (<span className="flex justify-center items-center bg-yellow-300 w-2 h-2 rounded-[50%] absolute top-[10px] left-[31px]"></span>)}
                <Bell width={18} height={18}/>
            </div>

            <div className="flex justify-center items-center text-white cursor-pointer hover:bg-gray-100/10 p-4 rounded-[5px]" onClick={() => setTab?.("settings")}>
                <Settings width={18} height={18}/>
            </div>

            <div className="flex justify-center items-center bg-yellow-300 w-10 h-10 rounded-[50%] text-black font-bold ml-auto" onClick={() => navigate(`/user/profile/id=${user.id}`)}>
                {formatInit(user?.name)}
            </div>
        </div>
    )
}