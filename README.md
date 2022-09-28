# Tiny API Loader

A tiny helper that takes the pain out of loading third-party API's

## Overview

Consider the following pattern, which is common for loading third-party API's:

```html
<script>
    function onApiLoaded() {
        // API is ready
    }
</script>

<script src="https://service.com/api?callback=onApiLoaded"></script>
```

Now consider having one or more external files, within which you want to use the API. What's the easiest way to guarantee that the API is available before trying to use it? You could define `onApiLoaded` in the global scope from within your file, or perhaps leverage event listeners, but you'll have to consider race conditions and the possibility of multiple entry points.

Tiny API Loader abstracts these issues away and gives you a simple `Promise` that will load an API (if it hasn't already) and then resolve with a reference to the API itself.

```javascript
const foo = await loadApi();

// `foo` is a reference to the API.
foo.apiMethod();
```

## What're the caveats?

Just one, and that's loading time. Loading the API with a traditional `<script>` embed will of course be slightly faster, although once cached the difference should be negligible.

You can mitigate some of this overhead by utilising `<link rel="preconnect">` resource hints.

## What's the footprint?

Tiny. Seriously. Minified and gzipped, the loader itself weighs in at less than 350 bytes, with the additional presets being even smaller.

## Installation

```shell
> npm install tiny-api-loader
```

## Presets

* [Google Maps](#google-maps)
* [ReCaptcha](#recaptcha)
* [YouTube Iframe](#youtube-iframe)

## Google Maps

```html
<!-- Optional resource hint -->
<link rel="preconnect" href="https://maps.googleapis.com">
```

```javascript
import { loadGoogleMapsApi } from 'tiny-api-loader';

const api = await loadGoogleMapsApi({
    key: '[your api key]'
});
```

https://developers.google.com/maps/documentation/javascript/url-params

| Param | Required | Description |
| --- | --- | --- |
| key | ✅ | Your API key. |
| v | ❌ | The [version](https://developers.google.com/maps/documentation/javascript/versions) of the Maps JavaScript API to use. |
| libraries | ❌ | A comma-separated list of additional Maps JavaScript API [libraries](https://developers.google.com/maps/documentation/javascript/libraries) to load. |
| language | ❌ | The [language](https://developers.google.com/maps/documentation/javascript/localization) to use. This affects the names of controls, copyright notices, driving directions, and control labels, as well as the responses to service requests. See the [list of supported languages](https://developers.google.com/maps/faq#languagesupport).
| region | ❌ | The [region](https://developers.google.com/maps/documentation/javascript/localization#Region) code to use. This alters the map's behaviour based on a given country or territory.

## ReCaptcha

```html
<!-- Optional resource hints -->
<link rel="preconnect" href="https://www.google.com">
<link rel="preconnect" href="https://www.gstatic.com" crossorigin>
```

```javascript
import { loadReCaptchaApi } from 'tiny-api-loader';

const api = await loadReCaptchaApi();
```

https://developers.google.com/recaptcha/docs/loading

<table>
    <tr>
        <th>Param</th>
        <th>Version</th>
        <th>Required</th>
        <th>Value</th>
        <th>Description</th>
    </tr>
    <tr>
        <td rowspan="2">render</td>
        <td>2</td>
        <td>❌</td>
        <td>
            <code>'explicit'</code><br>
            <code>'onload'</code>
        </td>
        <td>
            Whether to render the widget explicitly. Defaults to onload, which will render the widget in the first g-recaptcha tag it finds.
        </td>
    </tr>
    <tr>
        <td>3</td>
        <td>❌</td>
        <td>[site key]</td>
        <td>
            Register reCAPTCHA v3 keys on the <a href="https://www.google.com/recaptcha/admin/create">reCAPTCHA Admin console</a>.
        </td>
    </tr>
    <tr>
        <td rowspan="2">hl</td>
        <td>2</td>
        <td>❌</td>
        <td>
            See<a href="https://developers.google.com/recaptcha/docs/language"> language codes</a>
        </td>
        <td>
            Forces the widget to render in a specific language. Auto-detects the user's language if unspecified.
        </td>
    </tr>
    <tr>
        <td>3</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
    </tr>
</table>

## YouTube Iframe

```html
<!-- Optional resource hint -->
<link rel="preconnect" href="https://www.youtube.com">
```

```javascript
import { loadReCaptchaApi } from 'tiny-api-loader';

const api = await loadReCaptchaApi();
```

https://developers.google.com/youtube/iframe_api_reference