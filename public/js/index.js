var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
    socket.emit('createMessage', {
        from: '1900',
        text: 'Hello, every one'
    })
})

socket.on('newMessage', function (newMessage) {
    console.log('newMessage', newMessage)
})

socket.on('disconnect', function () {
    console.log('Disconnected from server');
})


