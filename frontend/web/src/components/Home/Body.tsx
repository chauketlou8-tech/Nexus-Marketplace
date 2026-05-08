import Marketplace from "./HelperComponents/Marketplace.tsx";
import Services from "./HelperComponents/Services.tsx";
import Messages from "./HelperComponents/Messages.tsx";
import Dashboard from "./HelperComponents/DashBoard.tsx";
import type { setString } from "../shared/Types/Types.ts";
import type { Product, Category, Course, Service, Chat, Listing, User } from "../shared/Types/interface.ts";
import type { ReactElement } from "react";

type PageKey = "marketplace" | "services" | "messages" | "dashboard";

interface BodyProps {
    tab: string,
    search?: string,
    setTab?: setString,
    setSearch?: setString,
    products?: Product[],
    serviceCategories?: Category[],
    productCategories?: Category[],
    courses?: Course[],
    services?: Service[],
    chats?: Chat[],
    listings?: Listing[],
    user: User,
}


export default function Body({ tab, search, setSearch, products, serviceCategories, productCategories, courses, services, setTab, chats, listings, user }: BodyProps) {
    const pages: Record<PageKey, ReactElement> = {
        marketplace: <Marketplace search={search}
                                  setSearch={setSearch}
                                  products={products}
                                  categories={productCategories}
                                  courses={courses}
                                  setTab={setTab}
                                  listings={listings}
        />,
        services: <Services search={search}
                            setSearch={setSearch}
                            services={services}
                            categories={serviceCategories}
        />,
        messages: <Messages chats={chats} currUser={user}/>,
        dashboard: <Dashboard/>,
    };

    return pages[tab as PageKey];
}
