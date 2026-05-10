import { MessageCircle, Users, ShieldCheck } from "lucide-react";
import type { Chat, User } from "../../shared/Types/interface.ts"
import formatInit from "../../../utils/formatInit.ts"
import getUser from "../../../api/user/getUser.ts";
import { useState, useEffect } from "react";
import { readMessage as read }from "../../../api/messages/readMessage.ts";

export default function Messages({ chats, currUser } : {chats?: Chat[], currUser: User}) {

    const [currChat, setCurrChat] = useState<Chat | null>(null);
    const [otherUsers, setOtherUsers] = useState<User[]>([]);

    useEffect(() => {
        const getOtherUsers = async () => {
            if (!chats) return;

            const users: User[] = [];

            for (const chat of chats) {
                const participants = chat.participants;

                for (const participant of participants) {
                    if (Number(participant) !== Number(currUser.id)) {
                        const user: User = await getUser(participant);

                        users.push(user);
                    }
                }
            }

            setOtherUsers(users);
        }

        void getOtherUsers();
    }, [chats, currUser.id]);

    const readMessage = async (chat: Chat) => {
        setCurrChat(chat);
        await read(chat._id, chat.lastMessage); //read the message
    }

    const formatDate = (date: string): string => {
        date = date.split("T")[0];

        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];

        return `${year}/${month}/${day}`;
    }

    // const readStatus = async (message: string): boolean => {
    //
    // }

    return (
        <div className="flex justify-between items-center gap-2 p-6 w-full">
            {
                chats &&

                <div className="flex flex-col items-center justify-start text-gray-500 gap-2 border-2 border-gray-200 h-fit min-h-[600px] min-w-[30%] bg-white p-6 px-0 rounded-[12px]">
                    <div className="flex justify-between items-center w-full px-6">
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
                            <div className="flex flex-col w-full p-4 gap-4">
                                {chats.map((chat: Chat, i: number) => (
                                    <div key={chat._id} className={`flex justify-start items-center w-full gap-2 p-4 pl-2 rounded-[12px] hover:bg-gray-100 transition-all ${chat._id === currChat?._id ? "border border-blue-400 bg-blue-50/60" : "border-0 bg-white"}`} onClick={() => readMessage(chat)}>
                                        <div>
                                            <span style={{ background: "blue" }} className="flex justify-center items-center w-[16px] h-[16px] rounded-[50%] p-4.5 text-[14px] font-[600] text-white">{formatInit(otherUsers[i]?.name || "")}</span>
                                        </div>

                                        <div className="flex flex-col items-start justify-center w-full pl-1">
                                            <div className="flex justify-start items-center w-full gap-2">
                                                <p className="text-black text-[14px] whitespace-nowrap">{otherUsers[i]?.name}</p>
                                                <ShieldCheck className="text-blue-500 w-[18px] h-[18px]"/>
                                            </div>

                                            <p className="text-[#666] text-[14px]">{ chat.lastMessage || ""}</p>
                                        </div>

                                        <div className="flex flex-col items-end justify-center">
                                            <p className="text-[#333] text-[14px]">{formatDate(chat.updatedAt)}</p>

                                            {
                                                chat.lastMessage?.readStatus ?
                                                    ""
                                                    :
                                                    <span className="flex justify-center items-center bg-black text-white text-[10px] w-[18px] h-[18px] p-2 font-bold rounded-[4px]">1</span>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                    }
                </div>
            }

            <div className="flex flex-col items-center justify-start text-gray-500 gap-2 border-2 border-gray-300 h-fit min-h-[600px] min-w-[70%] bg-white p-6 rounded-[12px]">
                {
                    chats ?
                        (
                            currChat ?
                                <div className="flex items-center justify-center text-gray-500 gap-2 w-full flex-grow">
                                    <MessageCircle className="w-10 h-10 text-gray-400" />
                                    <p className="text-sm">This is your chat</p>
                                </div>
                                :
                                <div className="flex items-center justify-center text-gray-500 gap-2 w-full flex-grow">
                                    <MessageCircle className="w-10 h-10 text-gray-400" />
                                    <p className="text-sm">Select a message</p>
                                </div>
                        )
                        :
                        <div className="flex items-center justify-center text-gray-500 gap-2 w-full flex-grow">
                            <MessageCircle className="w-10 h-10 text-gray-400" />
                            <p className="text-sm">No messages yet</p>
                        </div>
                }
            </div>
        </div>
    )
}