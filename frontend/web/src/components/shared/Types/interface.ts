export interface User {
    id?: number;
    name?: string;
    email?: string;
    role?: string;
    year?: number;
    is_verified?: boolean;
    created_at?: string;
    last_updated?: string;
}

export interface Product {
    _id?: string;
    title: string;
    description: string;
    price: number;
    sellerId: number;
    categoryId: string;
    condition: string;
    images: string[];
    tags: string[];
    courseIds: number[];
}

export interface Category {
    _id?: string;
    _v?: number;
    name?: string;
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Course {
    id?: number;
    code?: string;
    name?: string;
    faculty?: string;
    year?: number;
}

export interface Service {
    _id?: string;
    title?: string;
    description?: string;
    pricing?: {
        amount?: number;
        unit?: string;
    },
    categoryId: string,
    providerId?: string,
    availability?: {
        days?: string[];
        time?: string;
    }
    deliveryMode?: string[];
    rating?: number;
    images?: string[];
    courseIds?: string[];
}