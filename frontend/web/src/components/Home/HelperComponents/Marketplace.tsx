import RecommendationsPage from "./Marketplace/Recommendations.tsx";
import MarketplaceView from "./Marketplace/MarketplaceView.tsx";
import type {Category, Product, Course, Listing, Chat} from "../../shared/interface.ts";
import type { setString } from "../../shared/types.ts";
import type {User} from "../../shared/User.ts";
import { useState } from "react";

interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
    products?: Product[];
    categories?: Category[];
    courses?: Course[];
    setTab: setString
    listings?: Listing[];
    user: User;
    currChat: Chat | null;
    setCurrChat: (c: Chat) => void;
}

export default function Marketplace({ search, setSearch, products, categories, courses, setTab, listings, user, currChat, setCurrChat } : SearchProps) {
    void search
    void setSearch

    const [dismissed, setDismissed] = useState<boolean>(false);

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            <RecommendationsPage dismissed={dismissed} setDismissed={setDismissed} />
            <MarketplaceView products={products}
                             categories={categories}
                             courses={courses}
                             setTab={setTab}
                             listings={listings}
                             user={user}
                             currChat={currChat}
                             setCurrChat={setCurrChat}
            />
        </div>
    )
}