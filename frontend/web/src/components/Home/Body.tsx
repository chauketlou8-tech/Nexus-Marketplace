import Marketplace from "./HelperComponents/Marketplace.tsx";
import Services from "./HelperComponents/Services.tsx";
import Messages from "./HelperComponents/Messages.tsx";
import Dashboard from "./HelperComponents/DashBoard.tsx";
import type { setString } from "../shared/Types/Types.ts";
import type { Product, Category, Course, Service, Chat, Listing } from "../shared/Types/interface.ts";

type PageKey = "marketplace" | "services" | "messages" | "dashboard";

interface BodyProps {
    tab: string,
    search?: string,
    setTab?: setString,
    setSearch?: setString,
    products?: Product[],
    formatInit: (name: string) => string,
    categories?: Category[],
    courses?: Course[],
    services?: Service[],
    chats?: Chat[],
    listings?: Listing[],
}


export default function Body({ tab, search, setSearch, products, formatInit, categories, courses, services, setTab, chats, listings }: BodyProps) {
    const pages: Record<PageKey, JSX.Element> = {
        marketplace: <Marketplace search={search}
                                  setSearch={setSearch}
                                  products={products}
                                  formatInit={formatInit}
                                  categories={categories}
                                  courses={courses}
                                  setTab={setTab}
                                  listings={listings}
        />,
        services: <Services search={search}
                            setSearch={setSearch}
                            services={services}
                            categories={categories}
                            formatInit={formatInit}
        />,
        messages: <Messages chats={chats}/>,
        dashboard: <Dashboard/>,
    };

    return pages[tab as PageKey];
}
