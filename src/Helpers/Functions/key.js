import isNumeric from './isNumeric.js';

export default function key(value) {
    return isNumeric(value) ? parseFloat(value) : value;
}
