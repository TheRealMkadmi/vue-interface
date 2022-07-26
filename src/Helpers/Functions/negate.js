import isFunction from './isFunction.js';

export default function negate(fn) {
    return (...args) => isFunction(fn) ? !fn(...args) : !fn;
}
