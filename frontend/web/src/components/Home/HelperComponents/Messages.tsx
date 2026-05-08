import { MessageCircle, Users, MessageSquare, ShieldCheck } from "lucide-react";
import type { Chat, User } from "../../shared/Types/interface.ts"
import formatInit from "../../../utils/formatInit.ts"
//import { useState } from "react";

export default function Messages({ chats, currUser } : {chats?: Chat[], currUser: User}) {

    //const [currChat, setCurrChat] = useState<Chat>();

    //gets the name of the other user
    const otherUsername = (participants: User[]): string => {
        for (const participant of participants) {
            if (Number(participant.id) === Number(currUser.id)) {
                return participant.name as string;
            }
        }

        return "";
    }

    return (
        <div className="flex justify-between items-center gap-2 p-6 w-full">
            {
                chats &&

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

                    {
                        chats.length === 0 ?

                            <div className="flex justify-center items-center text-gray-500 gap-2 w-full flex-grow">
                                <Users className="w-10 h-10 text-gray-400" />
                                <p className="text-sm">No contacts yet</p>
                            </div>
                            :
                            <div>
                                {chats.map((chat: Chat) => (
                                    <div key={chat._id}>
                                        <div>
                                            {/*@ts-ignore*/}
                                            {formatInit(otherUsername(chat.participants))}
                                        </div>

                                        <div>
                                            <div>
                                                {/*@ts-ignore*/}
                                                {otherUsername(chat.participants)}
                                                <ShieldCheck/>
                                            </div>

                                            <p>{chat.lastMessage}</p>
                                        </div>

                                        <div>
                                            <p>{chat.updatedAt}</p>

                                            {
                                                chat.lastMessage.readStatus ?
                                                    ""
                                                    :
                                                    <span>1</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }
                </div>
            }

            <div className="flex flex-col items-center justify-start text-gray-500 gap-2 border-2 border-gray-300 h-fit min-h-[600px] min-w-[70%] bg-white p-6 rounded-[12px]">
                <div className="flex items-center justify-center text-gray-500 gap-2 w-full flex-grow">
                    <MessageSquare className="w-10 h-10 text-gray-400" />
                    <p className="text-sm">No messages yet</p>
                </div>
            </div>
        </div>
    )
}