export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    year: number;
    is_verified: boolean;
    created_at: Date;
    last_updated: Date;
}

export type setUser = (value: User | ((prevState: User) => User)) => void;