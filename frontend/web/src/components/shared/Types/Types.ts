export type setBool = (value: (((prevState: boolean) => boolean) | boolean)) => void;
export type setString = (value: (((prev: string) => string) | string) ) => void;
export type setArray = (value: ((prev: any[]) => any[]) | any[]) => void;