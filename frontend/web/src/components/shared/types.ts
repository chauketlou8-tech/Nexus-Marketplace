import type { User, Chat } from "./interface.ts"

export type setBool = (value: (((prevState: boolean) => boolean) | boolean)) => void;
export type setString = (value: (((prev: string) => string) | string)) => void;
export type setArray = (value: ((prev: any[]) => any[]) | any[]) => void;
export type setUser = (user: User) => void;
export type setChat = (chat: Chat) => void;
export type PageKey = "marketplace" | "services" | "messages" | "dashboard" | "notifications" | "settings";