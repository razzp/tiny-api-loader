/**
 * @jest-environment jsdom
 */

test('Cache is not overwritten if it already exists', async () => {
    // Set the global cache ahead of time, with some dummy data.
    window.__tinyApiLoaderCache = new Map([['foo', Promise.resolve()]]);

    // Dynamically import the module. This will incur the side-effect of
    // setting the global cache (if it is undefined) and then referencing it.
    // Because we've already defined the cache it'll trip the check.
    const { cache } = await import('../src/globals');

    expect(cache).toBeDefined();
    expect(cache.size).toBe(1);
    expect(cache.keys().next().value).toBe('foo');
});
