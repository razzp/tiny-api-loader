/**
 * @jest-environment jsdom
 * @jest-environment-options { "runScripts": "dangerously", "resources": "usable" }
 */

import { loadGoogleMapsApi } from '../../src/presets/loadGoogleMapsApi';

// Increase Jest's timeout as sometimes the API calls can take a while.
jest.setTimeout(10000);

// NOTE: This test is currently skipped as the Google Maps API requires a key.
// Strangely, the API still sometimes loads, but it's very inconsistent.
test.skip('API loads and resolves successfully', async () => {
    const api = await loadGoogleMapsApi({
        key: '',
    });

    expect(window.google.maps).toBeDefined();
    expect(api).toEqual(window.google.maps);
});
