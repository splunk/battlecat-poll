/**
 * Parses the given query string. A valid query string starts 
 * with the character '?'.
 * 
 * @param queryString {String} as obtained from location.search
 * @returns {Object} the object representation of the query string
 */
export function parseQueryString(queryString) {
    let result = null;
    if (queryString) {
        result = {};
        if (queryString[0] == '?') {
            queryString.slice(1).split('&').forEach(p => {
                let kv = p.split('=').map(decodeURIComponent);
                result[kv[0]] = kv.slice(1).join('=');
            });
        }
    }
    return result;
}