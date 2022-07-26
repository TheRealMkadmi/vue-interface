import isNull from './isNull.js';
import isArray from './isArray.js';
import isObject from './isObject.js';
import isUndefined from './isUndefined.js';

export default function isEmpty(value) {
    if(isArray(value)) {
        return value.length === 0;
    }
    else if(isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return value === '' || isNull(value) || isUndefined(value);
}
