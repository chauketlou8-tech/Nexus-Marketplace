import { ShoppingBag, GraduationCap, MessageCircle, ChartColumn } from "lucide-react"

export default function Tabs() {
    return (
        <div className="flex">
            <span className="flex">
                <ShoppingBag />
                <h2>Marketplace</h2>
            </span>

            <span className="flex">
                <GraduationCap />
                <h2>Services</h2>
            </span>

            <span className="flex">
                <MessageCircle />
                <h2>Messages</h2>
            </span>

            <span className="flex">
                <ChartColumn />
                <h2>Dashboard</h2>
            </span>
        </div>
    )
}