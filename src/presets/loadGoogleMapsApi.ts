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

function loadGoogleMapsApi(options: Options) {
    const params = { ...options, callback: 'onGoogleMapsAPIReady' };

    return load(
        'googlemaps',
        `https://maps.googleapis.com/maps/api/js?${serialise(params)}`,
        params.callback,
        () => globalThis.google?.maps
    );
}

export { loadGoogleMapsApi };
