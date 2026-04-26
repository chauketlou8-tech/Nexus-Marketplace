export type User =  {
    name: string;
    email: string;
    password: string;
    course: string;
    year: number;
} | {} | null;

export type setUser = (value: User | ((prevState: User) => User)) => void;