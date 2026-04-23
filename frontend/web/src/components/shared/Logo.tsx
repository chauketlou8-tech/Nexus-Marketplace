import { GraduationCap } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center justify-start rounded-[2rem] p-4 gap-4">
                <span className="flex justify-between items-center p-3 bg-purple-600 rounded-[8px]">
                    <GraduationCap color="white"/>
                </span>

            <div>
                <h2 className="whitespace-nowrap font-bold text-[25px]">UCT MarketHub</h2>
                <p className="whitespace-nowrap text-[12px] text-[#666]">Student Marketplace & Services</p>
            </div>
        </div>
    )
}