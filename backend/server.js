const express = require('express'); // for creating the server
const socket = require('socket.io'); // for websocket connection
const http = require('http'); // for connecting express to socket

const app = express(); // express instance
const server = http.createServer(app); // http server
const io = socket(server); // attach socket.io

// Serve static files from public folder
app.use(express.static('public'));

// Store connected users
let users = {};

io.on('connection', (socket) => {
    let username = 'Anonymous';

    // Listen for username from client
    socket.on('set username', (name) => {
        username = name && name.trim() ? name.trim() : 'Anonymous';
        users[socket.id] = username;
        // Notify all clients of new user
        io.emit('user list', Object.values(users));
        io.emit('chat message', `${username} joined the chat.`);
    });

    // Listen for chat messages
    socket.on('chat message', (msg) => {
        // Broadcast message with username
        io.emit('chat message', `${username}: ${msg}`);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        io.emit('chat message', `${username} left the chat.`);
        delete users[socket.id];
        io.emit('user list', Object.values(users));
    });
});

server.listen(8080, () => {
    console.log('Your server is running at: http://localhost:8080');
});
