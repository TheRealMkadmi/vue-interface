import isNull from './isNull.js';
import isArray from './isArray.js';

export default function isObject(value) {
    return (typeof value === 'object') && !isNull(value) && !isArray(value);
}
