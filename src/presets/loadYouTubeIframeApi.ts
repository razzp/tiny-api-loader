import { load } from '../utils/load';

/**
 * Loads the YouTube Iframe API.
 *
 * @returns {Promise} YouTube Iframe API
 */
function loadYouTubeIframeApi(): Promise<typeof YT> {
    return load(
        'youtube',
        `https://www.youtube.com/iframe_api`,
        'onYouTubeIframeAPIReady',
        () => globalThis.YT
    );
}

export { loadYouTubeIframeApi };
