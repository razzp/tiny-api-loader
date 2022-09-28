import { load } from '../utils/load';
import { serialise } from '../utils/serialise';

import type { Indexable } from '../interfaces/Indexable';

interface Options extends Indexable {
    render?: string;
    hl?: string;
}

/**
 * Loads the ReCaptcha API.
 *
 * @param {Object} [options] {@link https://developers.google.com/recaptcha/docs/loading See docs}.
 *
 * @returns {Promise} The ReCaptcha API
 */
function loadReCaptchaApi(options?: Options): Promise<typeof grecaptcha> {
    const params = { ...options, onload: 'onReCaptchaApiReady' };

    return load(
        'recaptcha',
        `https://www.google.com/recaptcha/api.js?${serialise(params)}`,
        params.onload,
        () => globalThis.grecaptcha
    );
}

export { loadReCaptchaApi };
