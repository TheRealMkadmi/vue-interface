import concatMap from './concatMap.js';

export default function flatten(x) {
    return concatMap(x => x)(x);
}
