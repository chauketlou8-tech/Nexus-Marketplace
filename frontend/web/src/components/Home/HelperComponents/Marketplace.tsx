import RecommendationsPage from "./Marketplace/Recommendations.tsx";
import MarketplaceView from "./Marketplace/MarketplaceView.tsx";
import type { Category, Product, Course, Listing } from "../../shared/Types/interface.ts";
import type { setString } from "../../shared/Types/Types.ts";

interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
    products?: Product[];
    categories?: Category[];
    courses?: Course[];
    setTab?: setString
    listings?: Listing[];
}

export default function Marketplace({ search, setSearch, products, categories, courses, setTab, listings } : SearchProps) {
    void search
    void setSearch

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            <RecommendationsPage/>
            <MarketplaceView products={products}
                             categories={categories}
                             courses={courses}
                             setTab={setTab}
                             listings={listings}
            />
        </div>
    )
}