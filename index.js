const http=require("http");
const express=require("express");
// const path=require("path");
const {Server}=require("socket.io");

const app=express();
const server=http.createServer(app);
const io=new Server(server);
// io request handler 
io.on("connection",(socket)=>{
  socket.on("getmessage",(message)=>{
    io.emit("here message", message);
  })
})


//express handler
app.use(express.static("./public"));
server.listen(9000,()=> console.log("server is activated"));
