import deepExtend from './deepExtend.js';

export default function cloneDeep(...args) {
    return deepExtend({}, ...args);
}
