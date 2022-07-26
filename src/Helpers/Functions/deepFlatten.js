import isArray from './isArray.js';
import concatMap from './concatMap.js';

export default function deepFlatten(x) {
    return concatMap(x => isArray(x) ? deepFlatten(x) : x)(x);
}
