import { Trash, Reply, Copy, ThumbsDown, Pin } from "lucide-react";
import type { setBool, setString } from "../../../shared/Types/Types.ts";

export default function MessageOptionsDialogue({ isOptionsOpen, setIsOptionsOpen, setOption } : { isOptionsOpen: boolean, setIsOptionsOpen: setBool, setOption: setString }) {
    void setIsOptionsOpen

    return (
        isOptionsOpen &&
        <div className="flex flex-col bg-white absolute left-70 py-4 w-[90px] border border-gray-500 rounded-[4px] gap-4">
            <div className="flex flex-col gap-2 px-1">
                <span onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOption("reply")
                }} className="flex justify-start items-center gap-1 p-1 text-black text-[12px] rounded-[4px] cursor-pointer hover:bg-gray-200">
                    <Reply className="w-4 h-4"/>
                    Reply
                </span>

                <span onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOption("copy")
                }} className="flex justify-start items-center gap-1 p-1 text-black text-[12px] rounded-[4px] cursor-pointer hover:bg-gray-200">
                    <Copy className="w-4 h-4"/>
                    Copy
                </span>

                <span onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOption("pin")
                }} className="flex justify-start items-center gap-1 p-1 text-black text-[12px] rounded-[4px] cursor-pointer hover:bg-gray-200">
                    <Pin className="w-4 h-4"/>
                    Pin
                </span>
            </div>

            <div className="w-full px-2">
                <hr className="w-full px-2"/>
            </div>

            <div className="flex flex-col gap-2 px-1">
                <span onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOption("report")
                }} className="flex justify-start items-center gap-1 p-1 text-black text-[12px] rounded-[4px] cursor-pointer hover:bg-gray-200">
                    <ThumbsDown className="w-4 h-4"/>
                    Report
                </span>

                <span onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setOption("delete")
                }} className="flex justify-start items-center gap-1 p-1 text-black text-[12px] rounded-[4px] cursor-pointer hover:bg-gray-200">
                    <Trash className="w-4 h-4"/>
                    Delete
                </span>
            </div>
        </div>
    )
}