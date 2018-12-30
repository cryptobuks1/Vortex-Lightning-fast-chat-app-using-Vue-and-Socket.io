const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

// Handle prod

if (process.env.NODE_ENV === 'production') {
    // static folder
    app.use(express.static(__dirname + '/public/'));
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

var server = app.listen(port, () => console.log(`Server started on port ${port}`));

var io = socket(server);

io.on('connection', function(socket) {
    console.log('Made socket connection', socket.id)
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
});