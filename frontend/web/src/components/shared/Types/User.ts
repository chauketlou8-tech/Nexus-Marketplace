export type User =  {
    id: number;
    name: string;
    email: string;
    role: string;
    year: number;
    is_verified: boolean;
    created_at?: string;
    last_updated?: string;
} | {} | null;

export type setUser = (value: User | ((prevState: User) => User)) => void;