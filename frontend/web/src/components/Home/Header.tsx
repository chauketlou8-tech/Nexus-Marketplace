import SearchBar from "./HelperComponents/SearchBar.tsx";
import Logo from "../shared/Logo.tsx";
import Tabs from "./HelperComponents/Tabs.tsx"

export default function Header() {
    return (
        <div className="flex">
            <Logo/>
            <SearchBar />
            <Tabs />
        </div>
    )
}