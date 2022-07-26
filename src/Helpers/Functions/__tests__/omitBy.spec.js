import omitBy from '../omitBy.js';
import isNumber from '../isNumber.js';

test('omitBy() isNumber', () => {
    const picked = omitBy({
        'a': 1,
        'b': '2',
        'c': 3
    }, isNumber);

    expect(picked.a).toBe(undefined);
    expect(picked.b).toBe('2');
    expect(picked.c).toBe(undefined);
});
