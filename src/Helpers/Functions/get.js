import isArray from './isArray.js';
import isString from './isString.js';

export default function get(object, path) {
    return (isString(path) ? path.split('.') : (!isArray(path) ? [path] : path)).reduce((a, b) => a[b], object);
}
