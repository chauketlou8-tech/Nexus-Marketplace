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
    categoryType?: string;
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
    serviceType?: string;
    description?: string;
    providerId?: number;
    categoryId?: string;
    courses?: string[];
    skills?: string[];
    availability?: string;
    pricing?: {
        amount?: number;
        unit?: string;
    }
    images?: string[];
}

export interface Chat {
    _id: string;
    participants: number[];
    lastMessage: any;
    createdAt: string;
    updatedAt: string;
}

export interface Listing {
    _id?: string;
    createdAt?: Date;
    itemId?: string;
    price?: number;
    sellerId?: number;
    status?: string;
    updatedAt?: Date;
    itemType?: string;
}