import SearchBar from "./HelperComponents/SearchBar.tsx";
import Logo from "../shared/Logo.tsx";
import Tabs from "./HelperComponents/Tabs.tsx"
import type { User } from "../shared/Types/User.ts";
import type { setString } from "../shared/Types/Types.ts";

interface HeaderProps {
    tab?: string
    search?: string
    setTab?: setString
    setSearch?: setString
    user: User
}

export default function Header({ tab, setTab, search, setSearch, user }: HeaderProps) {
    return (
        <div className="flex justify-between items-center w-full px-4 py-2 gap-4 sticky top-0 left-0 h-[80px] bg-white border-b border-gray-200 z-[999]">
            <Logo/>
            <SearchBar search={search} setSearch={setSearch} />
            <Tabs tab={tab} setTab={setTab} user={user} />
        </div>
    )
}