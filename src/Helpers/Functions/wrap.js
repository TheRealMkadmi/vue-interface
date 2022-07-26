import isFunction from './isFunction.js';

export default function wrap(subject, fn) {
    return (...args) => {
        return isFunction(fn) ? fn(subject, ...args) : args;
    };
};
