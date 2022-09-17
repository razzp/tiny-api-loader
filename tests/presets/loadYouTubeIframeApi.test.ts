/**
 * @jest-environment jsdom
 * @jest-environment-options { "runScripts": "dangerously", "resources": "usable" }
 */

import { loadYouTubeIframeApi } from '../../src/presets/loadYouTubeIframeApi';

// Increase Jest's timeout as sometimes the API calls can take a while.
jest.setTimeout(10000);

test('API is loaded successfully', async () => {
    const api = await loadYouTubeIframeApi();

    expect(window.YT).toBeDefined();
    expect(api).toEqual(window.YT);
    expect(window.__tinyApiLoaderCache.size).toBe(1);
});
