/**
 * @jest-environment jsdom
 * @jest-environment-options { "runScripts": "dangerously", "resources": "usable" }
 */

import { load } from '../../src/utils/load';

function asBase64Embed(input: string): string {
    return `data:text/javascript;base64,${Buffer.from(input).toString(
        'base64'
    )}`;
}

function loadTestApi(resolver?: () => unknown) {
    return load(
        'test',
        asBase64Embed('window.foo = "bar"; window.onTestAPIReady()'),
        'onTestAPIReady',
        resolver
    );
}

test('Mock API is loaded successfully', async () => {
    const api = await loadTestApi(() => window.foo);

    expect(window.foo).toBe('bar');
    expect(api).toEqual(window.foo);
    expect(window.__tinyApiLoaderCache.size).toBe(1);
    expect(window.__tinyApiLoaderCache.keys().next().value).toBe('test');
});

test('Loading API again successfully uses cache', async () => {
    const api = await loadTestApi(() => window.foo);
    const tagCount = document.getElementsByTagName('script').length;

    expect(window.foo).toBe('bar');
    expect(api).toEqual(window.foo);
    expect(window.__tinyApiLoaderCache.size).toBe(1);
    expect(window.__tinyApiLoaderCache.keys().next().value).toBe('test');
    expect(document.getElementsByTagName('script').length).toBe(tagCount);
});

test('API loader with no resolver, resolves with `undefined`', async () => {
    // Clear the cache first, so that a new entry will be created without the
    // resolver from any previous test(s).
    window.__tinyApiLoaderCache.clear();

    const api = await loadTestApi();

    expect(api).toBeUndefined();
});
