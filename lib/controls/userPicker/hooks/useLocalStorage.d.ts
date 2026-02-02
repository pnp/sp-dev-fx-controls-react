export declare const useCache: (cacheType: "local" | "session") => {
    getCacheValue: (key: string) => any;
    setCacheValue: (key: string, newValue: unknown, expiredInSeconds?: number) => void;
};
//# sourceMappingURL=useLocalStorage.d.ts.map