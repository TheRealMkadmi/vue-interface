import key from './key.js';
import predicate from './predicate.js';

export default function findIndex(subject, value) {
    for(const i in subject) {
        if(predicate(value)(subject[i])) {
            return key(i);
        }
    }

    return -1;
}
