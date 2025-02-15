export declare function useSocialLogin(): {
    user: import("vue").Ref<null, null>;
    error: import("vue").Ref<Error | null, Error | null>;
    initialize: (options?: {
        google: {
            webClientId: any;
        };
    }) => Promise<void>;
    loginWithGoogle: (scopes?: string[]) => Promise<{
        provider: "google";
        result: import("@capgo/capacitor-social-login").GoogleLoginResponse;
    }>;
    logout: (provider?: string) => Promise<void>;
};
