/**
 * Serialise an object into a valid query string.
 * @private
 */
function serialise(obj: Record<string, unknown>): string {
    const params = new URLSearchParams(
        ...Object.keys(obj).map((key) => ({ [key]: String(obj[key]) }))
    );

    return params.toString();
}

export { serialise };
