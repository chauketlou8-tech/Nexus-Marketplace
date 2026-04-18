import { ShoppingBag, GraduationCap, MessageCircle, ChartColumn } from "lucide-react"

interface TabsProps {
    tab?: string
    setTab?: (value: (((prev: string) => string) | string) ) => void
}

export default function Tabs({ tab, setTab }: TabsProps) {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex justify-start items-center w-[60%] p-4 gap-4">
                <span onClick={() => { setTab?.("marketplace") }}
                    className={`flex justify-between items-center gap-2 px-2 py-1.75 rounded-[5px] ${tab === "marketplace" ? "bg-black" : "bg-white hover:bg-gray-100"}`}>
                    <ShoppingBag width="16px" height="16px" className={`${tab === "marketplace" ? "text-white" : "text-black"}`}/>
                    <h2 className={`text-[14px] font-[Roboto] ${tab === "marketplace" ? "text-white" : "text-black"}`}>Marketplace</h2>
                </span>

                <span onClick={() => { setTab?.("services") }}
                      className={`flex justify-between items-center gap-2 px-2 py-1.75 rounded-[5px] ${tab === "services" ? "bg-black" : "bg-white hover:bg-gray-100"}`}>
                    <GraduationCap width="16px" height="16px" className={`${tab === "services" ? "text-white" : "text-black"}`}/>
                    <h2 className={`text-[14px] font-[Roboto] ${tab === "services" ? "text-white" : "text-black"}`}>Services</h2>
                </span>

                <span onClick={() => { setTab?.("messages") }}
                      className={`flex justify-between items-center gap-2 px-2 py-1.75 rounded-[5px] ${tab === "messages" ? "bg-black" : "bg-white hover:bg-gray-100"}`}>
                    <MessageCircle width="16px" height="16px" className={`${tab === "messages" ? "text-white" : "text-black"}`}/>
                    <h2 className={`text-[14px] font-[Roboto] ${tab === "messages" ? "text-white" : "text-black"}`}>Messages</h2>
                </span>

                <span onClick={() => { setTab?.("dashboard") }}
                      className={`flex justify-between items-center gap-2 px-2 py-1.75 rounded-[5px] ${tab === "dashboard" ? "bg-black" : "bg-white hover:bg-gray-100"}`}>
                    <ChartColumn width="16px" height="16px" className={`${tab === "dashboard" ? "text-white" : "text-black"}`}/>
                    <h2 className={`text-[14px] font-[Roboto] ${tab === "dashboard" ? "text-white" : "text-black"}`}>Dashboard</h2>
                </span>
            </div>

            <span className="bg-[#ccc] w-[2px] h-[30px]"></span>

            <div>
                {/*Profile goes here*/}
            </div>
        </div>
    )
}