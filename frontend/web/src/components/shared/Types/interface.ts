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

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    sellerId: number;
    categoryId: string;
    condition: string;
    images: string[];
    tags: string[];
    courseIds: number[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    _id?: string;
    _v?: number;
    name?: string;
    slug?: string;
    categoryType?: string;
    createdAt: Date;
    updatedAt: Date;
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
    createdAt: Date;
    updatedAt: Date;
}

export interface Chat {
    _id: string;
    participants: number[];
    lastMessage: any;
    i?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Listing {
    _id?: string;
    itemId?: string;
    price?: number;
    sellerId?: number;
    status?: string;
    itemType?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    _id?: string;
    message: string;
    chatId?: string;
    readStatus: boolean;
    senderId?: number;
    createdAt?: Date;
    updatedAt: Date;
}