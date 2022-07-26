import each from './each.js';

export default function map(object, fn) {
    const mapped = {};

    each(object, (value, key) => {
        mapped[key] = fn(value, key);
    });

    return mapped;
}
