interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
}

export default function Marketplace({ search, setSearch } : SearchProps) {
    console.log(search, setSearch);
    return (
        "Welcome to the marketplace!"
    )
}