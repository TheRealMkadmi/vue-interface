import get from './get.js';

export default function property(path) {
    return object => {
        return get(object, path);
    };
}
