const net = require("net");

let sockets = [];
console.log(sockets)

const server = net.createServer((socket) => {
  sockets.push(socket);
  console.log("Client Connected!!");

  socket.on("data", (data) => {
    //broadcasts message to the group chats,
    // ensures message isn't sent to the message composer
    broadcast(data, socket);
  });

  socket.on("error", (error) => {
    console.log("A client disconnected");
  });

  socket.on("close", () => {
    console.log("A client has left the group chat");
  });
});

server.listen(4500);

function broadcast(message, socketSent) {
  if (message.toString() === "quit") {
    const index = sockets.indexOf(socketSent);
    sockets.splice(index, 1);
  } else {
    sockets.forEach((socket) => {
      if (socket !== socketSent) {
        socket.write(message);
      }
    });
  }
}
