/**
 * @jest-environment jsdom
 * @jest-environment-options { "runScripts": "dangerously", "resources": "usable" }
 */

import { loadReCaptchaApi } from '../../src/presets/loadReCaptchaApi';

// Increase Jest's timeout as sometimes the API calls can take a while.
jest.setTimeout(10000);

test('API loads and resolves successfully', async () => {
    const api = await loadReCaptchaApi();

    expect(window.grecaptcha).toBeDefined();
    expect(api).toEqual(window.grecaptcha);
});
