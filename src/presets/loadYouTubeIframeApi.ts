import { load } from '../utils/load';

function loadYouTubeIframeApi() {
    return load(
        'youtube',
        `https://www.youtube.com/iframe_api`,
        'onYouTubeIframeAPIReady',
        () => window.YT
    );
}

export { loadYouTubeIframeApi };
