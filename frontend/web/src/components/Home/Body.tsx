import Marketplace from "./HelperComponents/Marketplace.tsx";
import Services from "./HelperComponents/Services.tsx";
import Messages from "./HelperComponents/Messages.tsx";
import Dashboard from "./HelperComponents/DashBoard.tsx";
import Notifications from "./HelperComponents/Notifications.tsx";
import Settings from "./HelperComponents/Settings.tsx";
import type { setString, setArray, PageKey } from "../shared/types.ts";
import type { Product, Category, Course, Service, Chat, Listing, User } from "../shared/interface.ts";
import type { ReactElement } from "react";

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
    setChats: setArray,
    currChat: Chat | null,
    setCurrChat: (chat: Chat) => void,
}


export default function Body({ tab, search, setSearch, products, serviceCategories, productCategories, courses, services, setTab, chats, listings, user, setChats, setCurrChat, currChat }: BodyProps) {
    const pages: Record<PageKey, ReactElement> = {
        marketplace: <Marketplace search={search}
                                  setSearch={setSearch}
                                  products={products}
                                  categories={productCategories}
                                  courses={courses}
                                  setTab={setTab}
                                  listings={listings}
                                  //@ts-ignore
                                  user={user}
                                  currChat={currChat}
                                  setCurrChat={setCurrChat}
        />,
        services: <Services search={search}
                            setSearch={setSearch}
                            services={services}
                            categories={serviceCategories}
                            setCurrChat={setCurrChat}
                            user={user}
                            setTab={setTab}
        />,
        messages: <Messages chats={chats}
                            currUser={user}
                            setChats={setChats}
                            currChat={currChat}
                            setCurrChat={setCurrChat}
        />,
        dashboard: <Dashboard/>,
        notifications: <Notifications/>,
        settings: <Settings/>,
    };
    void pages;
    void tab;

    return (
        <div className="flex flex-col items-center w-[81%] bg-black fixed top-[80px] bottom-0 left-[19%] border-l-1 border-l-gray-200 overflow-y-auto scroll-hide">
            {pages[tab as PageKey]}
        </div>
    )
}
