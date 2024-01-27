const net = require("net");
//helps to R/W input into the command line
const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const waitForUserName = new Promise((resolve) => {
  //create a prompt
  readLine.question("Enter a username to join chat: ", (username) => {
    resolve(username);
  });
});

waitForUserName.then((username) => {
  const client =  net.connect({
    port: 4500,
  });

  client.on("connect", () => {
    client.write(`${username} has joined the chat.`);
  });

  readLine.on("line", (data) => {
    if (data === "quit") {
      client.write(`${username} has left the chat.`);
      client.setTimeout(1000);
    } else {
      client.write(`${username}: ${data}`);
    }
  });

  client.on("data", (data) => {
    console.log("\x1b[33m%s\x1b[0m", data);
  });

  client.on("timeout", () => {
    client.write("quit");
    client.end();
  });

  client.on("end", () => {
    console.log("Connection with the server ended gracefully");
    process.exit();
  });

  client.on("error", (error) => {
    console.error("Client Error:", error.message);
  });
});
