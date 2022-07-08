var { removeDuplicatesSafe, storageBridge } = require('../dist/index.js');
const { assert } = require('chai');

storageBridge.subscribe('my-namespace', function(data) {
    console.log('vbvbvbvvbbv', data); // prints: { message: 'Hello world!'}
});

storageBridge.send('my-namespace', { message: 'Hello world!' });


describe('Utils test', () => {
    it('Remove duplicates from array', () => {
        let res = removeDuplicatesSafe(['aaa', 'aaa', 'p', '1', 1]);
        assert.deepEqual(res, ['aaa', 'p', '1']);
    });
});

alert(33)