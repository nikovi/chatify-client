const express = require('express')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

io.on('connection', (socket) => {

    let socketId = socket.id
    socket.broadcast.emit('broadcast connection', socketId)
    
    socket.on('chat message', (data)=>{
        io.emit('chat message', data)
    })

    socket.on('chat typing', (data) => {
        socket.broadcast.emit('chat typing', data)
    })

    socket.on('stop typing', ()=>{
        socket.broadcast.emit('stop typing')
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('broadcast disconnect', socketId)
    })
})

const PORT = 3030

http.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})