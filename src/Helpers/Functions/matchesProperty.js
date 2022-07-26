import get from './get.js';

export default function matchesProperty(path, value) {
    return subject => {
        return get(subject, path) === value;
    };
}
