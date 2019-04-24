var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
})

socket.on('newMessage', function (message) {
    console.log('newMessage', message)
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`)
    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function (locationMessage) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${locationMessage.from}:`);
    a.attr('href', locationMessage.url);
    li.append(a);
    jQuery('#messages').append(li);
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

var messageTextBox = jQuery('[name=message]');
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.')
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (postion) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: postion.coords.latitude,
            longitude: postion.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    })
})


/**原生写法**/
// var test = document.getElementById('send-location');
// test.addEventListener('click', function () {
//     var _this = this;
//     if (!navigator.geolocation) {
//         return alert('Geolocation not supported by your browser.')
//     }
//     _this.setAttribute('disabled', 'disabled');
//     navigator.geolocation.getCurrentPosition(function(postion) {
//         console.log(postion);
//         _this.removeAttribute('disabled');
//         socket.emit('createLocationMessage', {
//             latitude: postion.coords.latitude,
//             longitude: postion.coords.longitude
//         })
//     }, function () {
//         _this.removeAttribute('disabled');
//         alert('Unable to fetch location')
//     })
// });

