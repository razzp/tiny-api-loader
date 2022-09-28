import { load } from '../utils/load';
import { serialise } from '../utils/serialise';

import type { Indexable } from '../interfaces/Indexable';

interface Options extends Indexable {
    render?: string;
    hl?: string;
}

function loadReCaptchaApi(options?: Options) {
    const params = { ...options, onload: 'onReCaptchaApiReady' };

    return load(
        'recaptcha',
        `https://www.google.com/recaptcha/api.js?${serialise(params)}`,
        params.onload,
        () => globalThis.grecaptcha
    );
}

export { loadReCaptchaApi };
