import { type IUser, type ILoginCredentials } from '../types/user.types';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", Pick<{
    user: import("vue").Ref<{
        id: number;
        email: string;
        name: string;
    } | null, IUser | {
        id: number;
        email: string;
        name: string;
    } | null>;
    token: import("vue").Ref<string, string>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}, "token" | "user">, Pick<{
    user: import("vue").Ref<{
        id: number;
        email: string;
        name: string;
    } | null, IUser | {
        id: number;
        email: string;
        name: string;
    } | null>;
    token: import("vue").Ref<string, string>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}, "isAuthenticated">, Pick<{
    user: import("vue").Ref<{
        id: number;
        email: string;
        name: string;
    } | null, IUser | {
        id: number;
        email: string;
        name: string;
    } | null>;
    token: import("vue").Ref<string, string>;
    isAuthenticated: import("vue").ComputedRef<boolean>;
    login: (credentials: ILoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    initializeAuth: () => Promise<void>;
}, "login" | "logout" | "initializeAuth">>;
