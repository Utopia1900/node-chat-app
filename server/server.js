const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('createMessage', (newMessage) => {
        console.log('New message', newMessage);
    })

    socket.emit('newMessage', {
        from: 'colin',
        text: 'My name is colin',
        createdAt: 123123
    })

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
