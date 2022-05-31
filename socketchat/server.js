const express = require('express');
const path    = require('path');
const http    = require('http');
const dotenv  = require('dotenv');
const sc      = require('socket.io'); 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = sc(server);


app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(process.env.PORT);

let conectUsers = [];

io.on('connection',(socket) => {
    
    socket.on('join-request',(username)=>{
        console.log(username);
        socket.username = username;
        conectUsers.push(username);

        socket.emit('user-ok',conectUsers);
        socket.broadcast.emit('list-update',{
            joined:username,
            list:conectUsers
        });
    });

    socket.on('send-msg',(txt)=>{
        let obj ={
            username:socket.username,
            message:txt
        }
        //socket.emit('show-msg',obj);
        socket.broadcast.emit('show-msg',obj);
    });

    socket.on('disconnect', ()=>{
        conectUsers = conectUsers.filter(u=> u != socket.username);

        socket.broadcast.emit('list-update',{
            left:socket.username,
            list:conectUsers
        });
    });
});
