import RecommendationsPage from "./Marketplace/Recommendations.tsx";
import MarketplaceView from "./Marketplace/MarketplaceView.tsx";

interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
}

export default function Marketplace({ search, setSearch } : SearchProps) {
    void search
    void setSearch

    return (
        <div className="flex flex-col justify-center items-center w-full p-4">
            <RecommendationsPage/>
            <MarketplaceView/>
        </div>
    )
}