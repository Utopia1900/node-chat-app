var { generateMessage, generateLocationMessage } = require('./message');
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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Deb';
    var latitude = 15;
    var longitude = 19;
    var url = `https://www.google.com/maps?q=15,19`;
    var location = generateLocationMessage(from, latitude, longitude);
    expect(location.createdAt).not.toBeNaN();
    expect(location).toMatchObject({ from, url });
  })
})
