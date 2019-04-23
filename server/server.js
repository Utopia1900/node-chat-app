const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var { generateMessage, generateLocationMessage } = require('./utils/message');

app.use(express.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from server');
    })
    
    socket.on('createLocationMessage', (coords) => {
       io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    })
});

server.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
