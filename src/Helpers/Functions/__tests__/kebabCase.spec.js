import kebabCase from '../kebabCase.js';

test('kebabCase()', () => {
    expect(kebabCase('test case')).toBe('test-case');
    expect(kebabCase('Test Case')).toBe('test-case');
    expect(kebabCase('Test-Case')).toBe('test-case');
    expect(kebabCase('Test_Case')).toBe('test-case');
});
