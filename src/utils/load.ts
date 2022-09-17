import { cache } from '../globals';

/**
 * Load an API by injecting a script tag into the DOM and waiting for a specific
 * callback to be fired. Subsequent calls are instead fetched from a cache.
 * @private
 */
function load<T = void>(
    id: string,
    src: string,
    hook: string,
    resolver?: () => T
): Promise<T> {
    // If a promise has already been created (in a previous API load), then we
    // want to reference that instead, otherwise there's potential for multiple
    // instances of the API to be loaded, which could cause issues.
    const promise =
        cache.get(id) ??
        new Promise((resolve, reject) => {
            // Create a script tag in memory.
            const script = document.createElement('script');

            // Set the script tag attributes. The `async` attribute ensures that
            // the script, once injected, is non-blocking.
            script.async = true;
            script.onerror = reject;
            script.src = src;

            // Register the callback hook. This will be called once the API
            // has been successfully loaded.
            window[hook] = () => {
                // The hook is no longer needed, so clean it up.
                delete window[hook];

                // Resolve the promise.
                resolve(resolver?.() as T);
            };

            // Append the script tag to the DOM, initiating the loading process.
            window.document.head.appendChild(script);
        });

    if (!cache.has(id)) {
        // Push the promise to the cache so that it can be referenced later.
        cache.set(id, promise);
    }

    return promise as Promise<T>;
}

export { load };
