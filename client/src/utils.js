import Jimp from 'jimp';

/**
 * Creates a thumbnail (as base64) from a full image (as base64).
 * @async
 * @function
 * @param {string} base64Image full image as base64 to create thumbnail from
 * @returns {Promise<string>} Resolves to base64 thumbnail
 */
export async function createThumbnailFromBase64Image(base64Image) {
    const img = await Jimp.read(Buffer.from(base64Image.replace(/^data:image\/png;base64,/, ""), 'base64'));
    img.cover(80, 80);
    return await img.getBase64Async(Jimp.MIME_PNG);
}


/**
 * FilterObject predicate function.
 * @callback filterObjectPredicate
 * @param {*} value value behind a key
 * @returns {boolean} true if object shall be included
 */


/**
 * Filters an object by a given predicate
 * @function
 * @param {object} obj object to filter 
 * @param {filterObjectPredicate} predicate filter function
 * @returns {object} filtered object
 * @example
 * var scores = { John: 2, Sarah: 3, Janet: 1 };
 * var filtered = filterObject(scores, score => score > 1); 
 * // { "John": 2, "Sarah": 3 }
 * @see https://stackoverflow.com/a/37616104
 */
export function filterObject(obj, predicate) { 
    return Object.keys(obj)
        .filter( key => predicate(obj[key]) )
        .reduce( (res, key) => {
            res[key] = obj[key];
            return res;
        }, {});
}


/**
 * Generates a RFC4122 v4 compliant UUID
 * @function
 * @returns {string} uuid v4
 * @see https://stackoverflow.com/a/8809472
 */
export function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        // eslint-disable-next-line
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


/**
 * Simple check if a short text is an email by checking for @ symbol.
 * @param {string} text text input to check
 * @returns {boolean} true if text is an email
 */
export function isTextAnEmailAddress(text) 
{
    var re = /\S*@\S+/;
    return re.test(text);
}


/**
 * Removes nulled properties from an object.
 * @function
 * @param {object} obj 
 */
export function removeNulledPropertiesFromObject(obj) {
    Object.keys(obj).forEach((key) => (obj[key] == null) && delete obj[key]);
};


/**
 * Returns a new unique version of the supplied array.
 * @function
 * @param {Array<*>} array array to create unique version from
 * @returns {Array<*>} returns new unique array
 * @see https://stackoverflow.com/a/43046408
 */
export function uniqueArray(array) {
    var j = {}; 
    array.forEach( function(v) {
        j[v+ '::' + typeof v] = v;
    });
    return Object.keys(j).map(function(v){
        return j[v];
    });
} 

/**
 * Returns a valid concatenated path.
 * Also works with URLs.
 * @param {string} base first part
 * @param  {...string} parts part n
 * @returns {string} full path/url
 */
export const pathJoin = (base, ...parts) => {
    const trimSepRight = /\/+$/g;
    const trimSepLeftRight = /^\/+|\/+$/g;
    const partsTrimmed = parts.map(p => p.replace(trimSepLeftRight, ''));
    return [base.replace(trimSepRight, '')].concat(partsTrimmed).join('/');
};

/**
 * Returns app version read from environment
 * @returns {string} app version
 */
export const getAppVersion = () => {
    const suffix = process.env.REACT_APP_VERSION_NAME_SUFFIX || "";
    return process.env.REACT_APP_VERSION + suffix;
};
