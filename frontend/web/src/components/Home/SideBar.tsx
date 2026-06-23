import { ShoppingBag, Briefcase, MessageSquare, ClipboardList, LayoutDashboard, Package, Heart, ChevronRight, Wallet, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { setString } from "../shared/types.ts";
import type { User } from "../shared/interface.ts"
import { type ReactNode, useCallback } from "react";
import logoutUser from "../../api/user/logoutUser.ts";

interface sidebarProps {
    tab: string;
    setTab: setString;
    user: User;
}

export default function SideBar({ tab, setTab, user }: sidebarProps) {

    const navigate = useNavigate();

    const tabs: { tab: string; tag: string; icon: ReactNode }[] = [
        {
            tab: "Marketplace",
            tag: "marketplace",
            icon: <ShoppingBag width={18} height={18} />
        },
        {
            tab: "Services",
            tag: "services",
            icon: <Briefcase width={18} height={18} />
        },
        {
            tab: "Messages",
            tag: "messages",
            icon: <MessageSquare width={18} height={18} />
        },
        {
            tab: "Orders",
            tag: "orders",
            icon: <ClipboardList width={18} height={18} />
        },
        {
            tab: "Favorites",
            tag: "favorites",
            icon: <Heart width={18} height={18} />
        },
        {
            tab: "My Listings",
            tag: "myListings",
            icon: <Package width={18} height={18} />
        },
        {
            tab: "Dashboard",
            tag: "dashboard",
            icon: <LayoutDashboard width={18} height={18} />
        },
        {
            tab: "Wallet",
            tag: "wallet",
            icon: <Wallet width={18} height={18} />
        }
    ]

    const logout = useCallback(async () => {
        await logoutUser(user.id);
        navigate("/");
    }, [user]);

    return (
        <div className="flex flex-col items-center w-[19%] min-h-screen bg-black fixed top-0 left-0 border-1 border-gray-200 overflow-hidden">
            <div className="flex justify-start items-start gap-2 pt-6">
                <span className="py-2 px-4 text-[20px] bg-[#ffb84d] text-black rounded-[10px] font-[900]">
                    N
                </span>

                <div className="mb-8 text-start">
                    <h1 className="text-2xl font-light text-white tracking-tight">
                        Nexus<span className="font-semibold text-[#ffb84d]">Marketplace</span>
                    </h1>
                    <p className="text-xs text-white/40 uppercase">Student Marketplace</p>
                </div>
            </div>

            <div className="w-full px-4">
                <hr className="opacity-[0.3]"/>
            </div>

            <div className="flex flex-col items-center gap-2 py-6 px-4 w-full">
                {
                    tabs.map((t, i) => (
                        <div key={i} onClick={() => setTab?.(t.tag)} className={`flex justify-between items-center w-full p-4 rounded-[10px] ${t.tag === tab ? "bg-orange-400/10 text-[#ffb84d]" : "bg-none text-white hover:bg-gray-200/5"}`}>
                            <div className="flex justify-start items-center gap-2">
                                {t.icon}
                                <p>{t.tab}</p>
                            </div>

                            {t.tag === tab && <ChevronRight width={18} height={18} className="transition-all hover:translate-x-1" />}
                        </div>
                    ))
                }
            </div>

            <div className="w-full px-4">
                <hr className="opacity-[0.3]"/>
            </div>

            <div onClick={logout} className="flex items-center justify-start w-full px-4 pt-6 gap-2 cursor-pointer">
                <LogOut width={18} height={18} color="red" />
                <p className="text-red-700">logout</p>
            </div>
        </div>
    )
}