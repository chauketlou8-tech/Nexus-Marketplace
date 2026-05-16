import { Trash, Reply, Copy, ThumbsDown, Pin, Check } from "lucide-react";
import type { setBool, setString } from "../../../shared/Types/Types.ts";

interface props {
    isOptionsOpen: boolean
    setIsOptionsOpen: setBool
    setOption: setString
    copied: boolean
    menuPosition: {
        x: number,
        y: number
    }
}

export default function MessageOptionsDialogue({ isOptionsOpen, setIsOptionsOpen, setOption, copied, menuPosition } : props) {
    void setIsOptionsOpen

    return (
        isOptionsOpen &&
        <div style={{ top: menuPosition.y, left: menuPosition.x }} className="fixed flex flex-col bg-white py-4 w-[90px] border border-gray-500 rounded-[4px] gap-4 z-[9999]">
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
                    {
                        copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>
                    }
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