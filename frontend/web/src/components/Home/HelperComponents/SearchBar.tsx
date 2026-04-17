import {  Search } from "lucide-react"

export default function SearchBar() {
    return (
        <div className="relative w-full">
            <Search width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]"/>
            <input type="text" placeholder="Search textbooks, items, services..." className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[12px] text-gray-600"/>
        </div>
    )
}