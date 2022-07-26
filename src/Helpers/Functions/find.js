import first from './first.js';
import predicate from './predicate.js';

export default function find(subject, value) {
    return first(subject.filter(object => predicate(value)(object)));
}
