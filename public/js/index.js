const socket = io(); //starts the client connection
const roomname = document.getElementById("room-name");
const userlist = document.getElementById("users");
const chatMessage = document.querySelector(".chat-messages");
chatMessage.scrollTop = chatMessage.scrollHeight;
//for getting the username and room from the url by neglacting the punctuation marks
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
socket.emit("join-room", { username, room });
//reciving the messages from the server

socket.on("message", (message) => {

  outputmsg(message);
  chatMessage.scrollTop = chatMessage.scrollHeight;// activated when we get msg
  
});
//get info about room users
socket.on("Room-users", ({ room, users }) => {
  outputroom(room), outputusers(users);
});

const chatForm = document.getElementById("chat-form");
const inputMsg = document.getElementById("inputmsg");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = inputMsg.value;
  //send message to the server;
  socket.emit("chatMessage", msg);
  inputMsg.value = "";
  inputMsg.focus();
});
const outputmsg = (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta"> ${msg.username} <span> ${msg.time} </span></p>
   <p class="text">
   ${msg.text}
   </p>`;
  document.querySelector(".chat-messages").appendChild(div);
};

function outputroom(room) {
  roomname.innerText=room;
}
function outputusers(users) {
  userlist.innerHTML = `
${users.map((user) => `<li>${user.username}</li>`).join("")} `;
  //join works like string so empty is neccary for initialization
}
