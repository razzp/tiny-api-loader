declare global {
    interface Window {
        [callback: string]: unknown;
        __tinyApiLoaderCache: Map<string, Promise<unknown>>;
    }
}

const { window: _WINDOW, document: _DOCUMENT } = globalThis;

// Fetch the cache, or create it if it doesn't exist yet.
const _CACHE = (_WINDOW.__tinyApiLoaderCache ??= new Map());

export { _CACHE, _DOCUMENT, _WINDOW };
