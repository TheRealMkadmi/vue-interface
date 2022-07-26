import isArray from './isArray.js';
import isNumber from './isNumber.js';

export default function isNumeric(value) {
    return isNumber(value) || (
        !!value && !isArray(value) && !!value.toString().match(/^-?[\d.,]+$/)
    );
}
