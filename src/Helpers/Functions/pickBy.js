import each from './each.js';
import predicate from './predicate.js';

export default function pickBy(object, match) {
    const subject = {};

    each(object, (value, key) => {
        if(predicate(match)(value)) {
            subject[key] = value;
        }
    });

    return subject;
}
