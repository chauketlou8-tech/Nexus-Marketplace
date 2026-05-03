import Marketplace from "./HelperComponents/Marketplace.tsx";
import Services from "./HelperComponents/Services.tsx";
import Messages from "./HelperComponents/Messages.tsx";
import Dashboard from "./HelperComponents/DashBoard.tsx";
import type { setString } from "../shared/Types/Types.ts";
import type { Product, Category, Course, Service } from "../shared/Types/interface.ts";

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
}


export default function Body({ tab, search, setSearch, products, formatInit, categories, courses, services }: BodyProps) {
    const pages: Record<PageKey, JSX.Element> = {
        marketplace: <Marketplace search={search}
                                  setSearch={setSearch}
                                  products={products}
                                  formatInit={formatInit}
                                  categories={categories}
                                  courses={courses}
        />,
        services: <Services search={search}
                            setSearch={setSearch}
                            services={services}
                            categories={categories}
                            formatInit={formatInit}
        />,
        messages: <Messages/>,
        dashboard: <Dashboard/>,
    };

    return pages[tab as PageKey];
}
