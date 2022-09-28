import { load } from '../utils/load';

function loadYouTubeIframeApi() {
    return load(
        'youtube',
        `https://www.youtube.com/iframe_api`,
        'onYouTubeIframeAPIReady',
        () => globalThis.YT
    );
}

export { loadYouTubeIframeApi };
