import isArray from './isArray.js';
import matches from './matches.js';
import isObject from './isObject.js';
import property from './property.js';
import isFunction from './isFunction.js';
import matchesProperty from './matchesProperty.js';

export default function predicate(value) {
    if(isObject(value)) {
        value = matches(value);
    }
    else if(isArray(value)) {
        value = matchesProperty(value[0], value[1]);
    }
    else if(!isFunction(value)) {
        value = property(value);
    }

    return value;
}
