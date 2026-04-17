import { GraduationCap } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center justify-start rounded-[2rem] w-full gap-4">
                <span>
                    <GraduationCap />
                </span>

            <div>
                <h2>UCT MarketHub</h2>
                <p>Student Marketplace & Services</p>
            </div>
        </div>
    )
}