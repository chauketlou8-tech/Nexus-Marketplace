import { MessageCircle, Users, MessageSquare } from "lucide-react";

export default function Messages(){
    return (
        <div className="flex justify-between items-center gap-2 p-6 w-full">
            <div className="flex flex-col items-center justify-start text-gray-500 gap-2 border-2 border-gray-200 h-fit min-h-[600px] min-w-[30%] bg-white p-6 rounded-[12px]">
                <div className="flex justify-between items-center w-full">
                    <span className="flex justify-start items-center gap-2">
                        <MessageCircle className="w-[18px] h-[18px] text-black"/>
                        <h2 className="text-black">Messages</h2>
                    </span>

                    <span>

                    </span>
                </div>

                <hr className="w-full"/>

                <div className="flex justify-center items-center text-gray-500 gap-2 w-full flex-grow">
                    <Users className="w-10 h-10 text-gray-400" />
                    <p className="text-sm">No contacts yet</p>
                </div>
            </div>

            <div className="flex flex-col items-center justify-start text-gray-500 gap-2 border-2 border-gray-300 h-fit min-h-[600px] min-w-[70%] bg-white p-6 rounded-[12px]">
                <div className="flex items-center justify-center text-gray-500 gap-2 w-full flex-grow">
                    <MessageSquare className="w-10 h-10 text-gray-400" />
                    <p className="text-sm">No messages yet</p>
                </div>
            </div>
        </div>
    )
}