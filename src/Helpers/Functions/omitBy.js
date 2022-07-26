import negate from './negate.js';
import pickBy from './pickBy.js';

export default function omitBy(object, fn) {
    return pickBy(object, negate(fn));
}
