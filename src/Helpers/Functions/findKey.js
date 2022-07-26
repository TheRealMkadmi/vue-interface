import first from './first.js';
import predicate from './predicate.js';

export default function findIndex(object, value) {
    return first(Object.keys(object).filter(
        key => predicate(value)(object[key])
    ));
}
