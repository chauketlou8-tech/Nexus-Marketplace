import { MessageCircle, Users, ShieldCheck, Clock, Send, Lightbulb, Ban } from "lucide-react";
import type { Chat, User, Message } from "../../shared/Types/interface.ts"
import type { setArray } from "../../shared/Types/Types.ts";
import formatInit from "../../../utils/formatInit.ts"
import getUser from "../../../api/user/getUser.ts";
import { useState, useEffect } from "react";
import { readMessage as read }from "../../../api/messages/readMessage.ts";
import getMessage from "../../../api/messages/getMessage.ts";
import getOnlineUsers from "../../../api/user/getOnlineUsers.ts";
import getMessages from "../../../api/messages/getMessages.ts";
import createMessage from "../../../api/messages/createMessage.ts";
import MessageOptionsDialogue from "./Messages/messageOptionsDialogue.tsx";
import deleteMessage from "../../../api/messages/deleteMessage.ts";

interface MessageProps {
    chats?: Chat[],
    currUser: User,
    setChats: setArray,
    currChat: Chat | null,
    setCurrChat: (c: Chat) => void
}

export default function Messages({ chats, currUser, setChats, setCurrChat, currChat } : MessageProps) {

    const [otherUsers, setOtherUsers] = useState<User[]>([]);
    const [statuses, setStatuses] = useState<boolean[]>([]);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [sentMsg, setSentMsg] = useState<string>("");
    const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
    const [option, setOption] = useState<string>("");
    const [clickedMessage, setClickedMessage] = useState<Message | null>(null);
    const [copied, setCopied] = useState<boolean>(false);
    void option

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

        //function to set statuses
        const ss = async () => {
            if (!chats) return;

            const s: boolean[] = [];

            for (const chat of chats) {
                const msg = await getMessage(chat.lastMessage, chat._id);
                s.push(msg.readStatus);
            }

            setStatuses(s);
        }

        void getOtherUsers();
        void ss();

    }, [chats, currUser.id, currChat]);

    useEffect(() => {
        const setMsgs = async () => {
            if (!currChat || !currChat._id) return;
            const msgs = await getMessages(currChat?._id);
            setMessages(msgs);
        }

        void setMsgs();
    }, [currChat]);

    useEffect(() => {
        const handleOption = async () => {
            if (!option || !clickedMessage || !currChat) return;

            if (option === "copy"){
                try{
                    await navigator.clipboard.writeText(clickedMessage.message);
                    setCopied(true);

                    setTimeout(() => {
                        setCopied(false);
                        setIsOptionsOpen(false);
                    }, 250);
                }
                catch(e){
                    setIsOptionsOpen(false);
                    console.error(e);
                }
            }
            else if (option === "delete") {
                await deleteMessage(clickedMessage._id, currChat._id);
                setMessages(prev => prev.map(msg =>
                    msg._id === clickedMessage._id
                        ? { ...msg, message: "message deleted" }
                        : msg
                ));

                setIsOptionsOpen(false);
            }
        }

        void handleOption();
    }, [option]);

    useEffect(() => {
        const setOnline = async () => {
            const online: string[] = await getOnlineUsers();

            setOnlineUsers(online);
        }

        void setOnline();
    }, []);

    const readMessage = async (chat: Chat, i: number) => {
        chat.i = i
        setCurrChat(chat);
        sessionStorage.setItem("currChat", JSON.stringify(chat)); //save the current chat for the session
        await read(chat._id, chat.lastMessage); //read the message changes the read status

        // update status locally
        setStatuses(prev => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
        });
    }

    const formatDate = (d: Date): string => {
        let date: string = d.toString();
        date = date.split("T")[0];

        const year = date.split("-")[0];
        const month = date.split("-")[1];
        const day = date.split("-")[2];

        return `${year}/${month}/${day}`;
    }

    const sendMessage = async () => {
        if (!sentMsg || !currChat || !chats) return;

        const updatedChats = chats.map(chat =>
            chat._id === currChat._id
                ? { ...chat, lastMessage: sentMsg }
                : chat
        );

        setChats(updatedChats);

        const newMessage = await createMessage(sentMsg, currChat._id);
        setMessages(prev => [...prev, newMessage]);

        setSentMsg("")
    }

    //when a message is clicked
    const clickMessage = (e: any, message: Message): void => {
        //console.log(e.clientX)
        if (!message) return;
        e.preventDefault();

        setClickedMessage(message);
        setIsOptionsOpen(true);
    }

    const otherUserId = currChat?.participants.find(
        p => Number(p) !== Number(currUser.id)
    );

    const currentOtherUser = otherUsers.find(
        u => Number(u.id) === Number(otherUserId)
    );

    return (
        <div className="flex justify-between items-center gap-2 p-6 w-full overflow-y-hidden">
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

                    <div className="px-6 w-full">
                        <hr className="w-full"/>
                    </div>

                    {
                        chats.length === 0 ?

                            <div className="flex justify-center items-center text-gray-500 gap-2 w-full flex-grow">
                                <Users className="w-10 h-10 text-gray-400" />
                                <p className="text-sm">No contacts yet</p>
                            </div>
                            :
                            <div className="flex flex-col w-full p-4 gap-4">
                                {chats.map((chat: Chat, i: number) => (
                                    <div key={chat._id} className={`flex justify-start items-center w-full gap-2 p-4 pl-2 rounded-[12px] hover:bg-gray-100 transition-all ${chat._id === currChat?._id ? "border border-blue-400 bg-blue-50/60" : "border-0 bg-white"}`} onClick={() => readMessage(chat, i)}>
                                        <div>
                                            <span style={{ background: "blue" }} className="flex justify-center items-center w-[16px] h-[16px] rounded-[50%] p-4.5 text-[14px] font-[600] text-white">{formatInit(otherUsers[i]?.name || "")}</span>
                                        </div>

                                        <div className="flex flex-col items-start justify-center w-full pl-1">
                                            <div className="flex justify-start items-center w-full gap-2">
                                                <p className="text-black text-[14px] whitespace-nowrap">{otherUsers[i]?.name}</p>
                                                <ShieldCheck className="text-blue-500 w-[18px] h-[18px]"/>
                                            </div>

                                            {
                                                chat.lastMessage === "message deleted"?
                                                    <span className="flex items-center gap-2">
                                                        <Ban className="w-[14px] h-[14px]"/>
                                                        <p className={`text-[13px] italic text-[#666]`}>message deleted</p>
                                                    </span>
                                                    :
                                                    <p className="text-[#666] text-[14px]">{ chat.lastMessage || "loading..."}</p>
                                            }
                                        </div>

                                        <div className="flex flex-col items-end justify-start">
                                            <p className="text-[#333] text-[14px]">{formatDate(chat.updatedAt)}</p>

                                            {
                                                statuses[i] ?
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
                                <div className="flex flex-col items-start justify-start text-gray-500 gap-2 w-full flex-grow">
                                    <div className="flex justify-start items-center w-full gap-2">
                                        <span className="flex justify-center items-center rounded-[50%] p-3.5 text-[18px] font-[600] text-white bg-blue-500">{formatInit(currentOtherUser?.name || "")}</span>

                                        <div className="flex flex-col items-start justify-start w-full pl-1">
                                            <div className="flex justify-start items-center w-full gap-2">
                                                <h2 className="text-black text-[16px] whitespace-nowrap">{currentOtherUser?.name}</h2>
                                                <ShieldCheck className="text-blue-500 w-[18px] h-[18px]"/>

                                                {
                                                    currentOtherUser?.is_verified &&
                                                    <span>Verified UCT Student</span>
                                                }
                                            </div>

                                            {
                                                onlineUsers.some((u: string) => Number(u) === Number(currentOtherUser?.id)) ?
                                                    <div className="flex justify-start items-center w-full gap-2">
                                                        <span className="inline-block w-[10px] h-[10px] rounded-[50%] bg-green-500 animate-pulse"></span>
                                                        <p className="font-[400] text-green-400 text-[14px]">Active now</p>
                                                    </div>
                                                    :
                                                    <div className="flex justify-start items-center w-full gap-2">
                                                        <span className="inline-block w-[10px] h-[10px] rounded-[50%] bg-red-600"></span>
                                                        <p className="font-[400] text-red-400 text-[14px]">Offline</p>
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                    <hr className="w-full"/>

                                    <div className="flex justify-start items-start w-full p-6 pb-0 h-[360px] overflow-y-auto scroll-hide">
                                        {
                                            messages && messages.length === 0 ?
                                                <div>

                                                </div>
                                                :
                                                <div onClick={() => setIsOptionsOpen(false)} className="flex flex-col w-full gap-8 relative">
                                                    { messages.map((message: Message) => (
                                                        <div onContextMenu={(e) => clickMessage(e, message)} key={message._id} className={`flex items-center w-full ${message.senderId === currUser.id ? "justify-end" : "justify-start"}`}>
                                                            <div className={`flex flex-col w-fit px-4 py-3 rounded-[10px] gap-1 ${message.senderId === currUser.id ? "bg-blue-600" : "bg-gray-100"}`}>
                                                                {
                                                                    message.message === "message deleted" ?
                                                                        <div className="flex items-center gap-1">
                                                                            <Ban className="w-[14px] h-[14px] opacity-80" stroke={`${message.senderId === currUser.id ? "#ccc" : "#999"}`}/>
                                                                            <p className={`text-[13px] italic ${message.senderId === currUser.id ? "text-white/60" : "text-[#999]"}`}>Message deleted</p>
                                                                        </div>
                                                                        :
                                                                        <>
                                                                            <p className={`text-[13px] ${message.senderId === currUser.id ? "text-white" : "text-[#333]"}`}>{message.message}</p>
                                                                            <span className="flex justify-start items-center gap-1">
                                                                                <Clock className="w-[14px] h-[14px]" stroke={`${message.senderId === currUser.id ? "#fff" : "#666"}`}/>
                                                                                <p className={`text-[12px] ${message.senderId === currUser.id ? "text-white" : "text-[#999]"}`}>{formatDate(message.updatedAt)}</p>
                                                                            </span>
                                                                        </>
                                                                }
                                                            </div>
                                                        </div>
                                                    )) }

                                                    <MessageOptionsDialogue isOptionsOpen={isOptionsOpen} setIsOptionsOpen={setIsOptionsOpen} setOption={setOption} copied={copied}/>
                                                </div>
                                        }
                                    </div>

                                    <div className="mt-auto w-full z-[999999]">
                                        <hr className="w-full"/>

                                        <div className="flex flex-col items-start justify-center pt-8 gap-4">
                                            <div className="flex justify-center items-center w-full gap-2">
                                                <input value={sentMsg} onChange={(e) => setSentMsg?.(e.target.value)} type="text" className="p-[.75rem] w-full bg-gray-100 border-0 outline-0 rounded-[5px] text-[12px] text-black" placeholder="Type your message..."/>
                                                <span className="bg-black px-3.5 py-2.5 rounded-[5px] cursor-pointer transition-all hover:bg-black/95" onClick={sendMessage}>
                                                    <Send stroke={"white"} className="w-4.5 h-4.5"/>
                                                </span>
                                            </div>

                                            <p className="flex justify-start items-center gap-1 text-[12px] text-[#999]"><Lightbulb className="w-4 h-4" stroke="gold"/> Tip: Meet in public campus locations like Jammie Stop for safety</p>
                                        </div>
                                    </div>

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