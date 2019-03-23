const socket = io();
const form = document.querySelector('form');
const user = document.querySelector('#user');
const message = document.querySelector('#m');
const messageList = document.querySelector('#messages');
const typing = document.querySelector('#typingPlaceholder');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(message.value.length && user.value.length){
        socket.emit('chat message', {
            message: message.value, 
            user: user.value
        });
        message.value='';
    }
})

message.addEventListener('keyup', () => {
    if(message.value.length && user.value.length){
        socket.emit('chat typing', {
            message: message.value,
            user: user.value
        })
    }else{
        socket.emit('stop typing')
    }
})

socket.on('broadcast connection', data=>{
    messageList.innerHTML += `<p>A user connected to socket: ${data}</p>`
})

socket.on('chat message', data => {
    const {user, message} = data
    messageList.innerHTML += `<p><strong>${user}: </strong>${message}</p>`
})

socket.on('stop typing', ()=> {
    typing.innerHTML = ''
})

socket.on('chat typing', data => {
    typing.innerHTML = `<p><em><strong>${data.user}</strong> is typing... </em></p>`
})

socket.on('broadcast disconnect', data=>{
    messageList.innerHTML += `<p>A user disconnected of socket: ${data}</p>`
})
