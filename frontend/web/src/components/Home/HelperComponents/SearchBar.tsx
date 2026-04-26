import {  Search } from "lucide-react"
import type { setString } from "../../shared/Types/Types.ts";

interface SearchProps {
    search?: string
    setSearch?: setString
}

export default function SearchBar({ search, setSearch }: SearchProps) {
    void search;
    return (
        <div className="flex justify-center items-center relative w-[60%]">
            <Search width="16px" height="16px" stroke="#999" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-[18px]"/>
            <input onChange={(e) => setSearch?.(e.target.value)} type="text" placeholder="Search textbooks, items, services..." className="w-full bg-gray-100 border-0 outline-0 rounded-[5px] py-2 pl-8 pr-3 text-[12px] text-gray-600"/>
        </div>
    )
}