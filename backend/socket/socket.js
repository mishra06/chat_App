const { Server } = require("socket.io");
const http = require("http");
const express = require("express");;

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:3000","https://chat-app-icqy.onrender.com"],
        methods:["GET","POST"],
        credentials:true
    },
});

// app.use(cors(corsOptions));

const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

const userSocketMap = {};


io.on('connection',(socket)=>{
    console.log("New client connected",socket.id);

    const userId = socket.handshake.query.userId;

    if(userId != "undefined") userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUser",Object.keys(userSocketMap));

    // socket.on() is used to listen the event . can be used both on client and server side.

    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.id);
        delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

 module.exports = {app,io,server,getReceiverSocketId};