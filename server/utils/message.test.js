var { generateMessage } = require('./message');
var expect = require('expect');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'Some message';
        var message = generateMessage(from, text);
        expect(message.createdAt).not.toBeNaN();
        expect(message).toMatchObject({ from, text });
    })
})