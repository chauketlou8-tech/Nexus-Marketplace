interface SearchProps {
    search?: string;
    setSearch?: (value: (((prev: string) => string) | string)) => void;
}

export default function Services({ search, setSearch }: SearchProps) {
    console.log(search, setSearch);
    return (
        "Welcome to the services page!"
    )
}