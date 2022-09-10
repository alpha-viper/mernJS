const { log } = require("console");
const express = require("express");
const socket = require("socket.io");

const app=express(); //Intialize and server ready
app.use(express.static("public"));
let port = process.env.PORT || 2051;
let server=app.listen(port,()=>{
    console.log("listening to port"+port);
});

let io=socket(server);

io.on("connection",(socket)=>{
    console.log("made socket connection");
    // Received data
    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})

