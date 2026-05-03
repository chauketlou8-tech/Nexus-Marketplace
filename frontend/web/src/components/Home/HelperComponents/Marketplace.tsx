import RecommendationsPage from "./Marketplace/Recommendations.tsx";
import MarketplaceView from "./Marketplace/MarketplaceView.tsx";
import type { Category, Product, Course } from "../../shared/Types/interface.ts";

interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
    products?: Product[];
    formatInit: (name: string) => string;
    categories?: Category[];
    courses?: Course[];
}

export default function Marketplace({ search, setSearch, products, formatInit, categories, courses } : SearchProps) {
    void search
    void setSearch

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            <RecommendationsPage/>
            <MarketplaceView products={products}
                             formatInit={formatInit}
                             categories={categories}
                             courses={courses}
            />
        </div>
    )
}