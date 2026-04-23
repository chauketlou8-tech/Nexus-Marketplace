import SearchBar from "./HelperComponents/SearchBar.tsx";
import Logo from "../shared/Logo.tsx";
import Tabs from "./HelperComponents/Tabs.tsx"

interface HeaderProps {
    tab?: string
    search?: string
    setTab?: (value: (((prev: string) => string) | string) ) => void
    setSearch?: (value: (((prev: string) => string) | string) ) => void
}

export default function Header({ tab, setTab, search, setSearch }: HeaderProps) {
    return (
        <div className="flex justify-between items-center w-full px-4 py-2 gap-4 sticky top-0 left-0 h-[80px] bg-white border-b border-gray-200 z-[999]">
            <Logo/>
            <SearchBar search={search} setSearch={setSearch} />
            <Tabs tab={tab} setTab={setTab} />
        </div>
    )
}