export declare const useLoadingStore: import("pinia").StoreDefinition<"loading", {
    loadingCount: number;
}, {
    isLoading: (state: {
        loadingCount: number;
    } & import("pinia").PiniaCustomStateProperties<{
        loadingCount: number;
    }>) => boolean;
}, {
    startLoading(): void;
    stopLoading(): void;
    resetLoading(): void;
}>;
