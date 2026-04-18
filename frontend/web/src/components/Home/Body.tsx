import Marketplace from "./HelperComponents/Marketplace.tsx";
import Services from "./HelperComponents/Services.tsx";
import Messages from "./HelperComponents/Messages.tsx";
import Dashboard from "./HelperComponents/DashBoard.tsx";

type PageKey = "marketplace" | "services" | "messages" | "dashboard";

interface HeaderProps {
    tab: string;
    search?: string;
    setTab?: (value: (((prev: string) => string) | string)) => void;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
}

export default function Body({ tab, search, setSearch }: HeaderProps) {
    const pages: Record<PageKey, JSX.Element> = {
        marketplace: <Marketplace search={search} setSearch={setSearch} />,
        services: <Services search={search} setSearch={setSearch} />,
        messages: <Messages />,
        dashboard: <Dashboard />,
    };

    return pages[tab as PageKey];
}
