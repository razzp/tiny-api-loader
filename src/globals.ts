declare global {
    interface Window {
        [callback: string]: unknown;
        __tinyApiLoaderCache: Map<string, Promise<unknown>>;
    }
}

// Fetch the cache, or create it if it doesn't exist yet.
const cache = (window.__tinyApiLoaderCache ??= new Map());

export { cache };
