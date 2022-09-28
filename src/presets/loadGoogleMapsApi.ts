import { load } from '../utils/load';
import { serialise } from '../utils/serialise';

import type { Indexable } from '../interfaces/Indexable';

type Libraries =
    | 'drawing'
    | 'geometry'
    | 'localContext'
    | 'places'
    | 'visualization';

interface Options extends Indexable {
    key: string;
    language?: string;
    libraries?: Libraries;
    region?: string;
    v?: string;
}

/**
 * Loads the Google Maps API.
 *
 * @param {Object} options {@link https://developers.google.com/maps/documentation/javascript/url-params See docs}.
 *
 * @returns {Promise} The Google Maps API
 */
function loadGoogleMapsApi(options: Options): Promise<typeof google.maps> {
    const params = { ...options, callback: 'onGoogleMapsAPIReady' };

    return load(
        'googlemaps',
        `https://maps.googleapis.com/maps/api/js?${serialise(params)}`,
        params.callback,
        () => globalThis.google?.maps
    );
}

export { loadGoogleMapsApi };
