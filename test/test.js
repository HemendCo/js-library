var { utils: { removeDuplicatesSafe } } = require('../dist/index.js');
const { assert } = require('chai');

describe('Utils test', () => {
    it('Remove duplicates from array', () => {
        let res = removeDuplicatesSafe(['aaa', 'aaa', 'p', '1', 1]);
        assert.deepEqual(res, ['aaa', 'p', '1']);
    });
});