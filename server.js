const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages.js");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const { userJoin, getuser, leaveuser, getRoomUsers } = require("./utils/user.js");

const bot = "chatbot";
//when the client side connects
io.on("connection", (socket) => {
  socket.on("join-room", ({ username, room }) => {
    const User = userJoin(socket.id, username, room); //.join functionality to join specific room
    socket.join(User.room);

    //only to the client which connects
    socket.emit("message", formatMessage(bot, "welcome to the chatboard "));
    //to all except the client which connect io emit;
    //.to for emiting at specific userroom only
    socket.broadcast
      .to(User.room)
      .emit(
        "message",
        formatMessage(bot, `${User.username} has join the chat`)
      );
    //info about the room and roomusers
    io.to(User.room).emit("Room-users", {
      room: User.room,
      users: getRoomUsers( User.room),
    });
  });

  //recieve the message
  socket.on("chatMessage", (msg) => {
    const User = getuser(socket.id);
    io.to(User.room).emit("message", formatMessage(User.username, msg));
  });
  //when io side disconnect

  socket.on("disconnect", () => {
    const User = leaveuser(socket.id);
    if (User) {
      io.to(User.room).emit(
        "message",
        formatMessage(bot, `${User.username}  has left the chat`)
      );
      io.to(User.room).emit("Room-users", {
        room: User.room,
        users: getRoomUsers( User.room),
      })
    }
  });
});
app.use(express.static("./public"));
server.listen(PORT, () => {
  console.log(`server is running on the port : ${PORT}`);
});
