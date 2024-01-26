// const net = require("net");

// const server = net.createServer((socket) => {
//   socket.write("Hello.");

//   // When data is received from the client
//   socket.on("data", (data) => {
//     console.log(data.toString());
//     setTimeout(() => {
//       const response = "HTTP/1.1 200 OK\r\n\r\nHello, World!\r\n";
//       socket.write(response);
//     }, 8000);
//   });

//   // When the client closes the connection
//   socket.on("close", () => {
//     console.log("Connection closed !!!");
//   });

//   // When an error occurs on the socket
//   socket.on("error", (error) => {
//     console.log(`Socket Error: ${error.message}`);
//   });
// });

// // When an error occurs on the server
// server.on("error", (error) => {
//   console.log(`Server Error: ${error.message}`);
// });

// server.listen(8080, () => {
//   console.log("server listening to", server.address());
// });


const net = require('net');

function handleRequest(socket) {
  console.log('Handling a new request');

  const chunks = [];
  console.log(chunks)

  socket.on('data', (chunk) => {
    chunks.push(chunk);
  });

  socket.on('end', () => {
    const requestData = Buffer.concat(chunks).toString();
    console.log('Received request data:', requestData);
    console.log('Processing the request');
    // Simulating processing time
    setTimeout(() => {
        console.log('Sending response...');
      const response = 'HTTP/1.1 200 OK\r\n\r\nHello, World!\r\n';
      socket.write(response);
      socket.end();
      console.log('Response sent.');
      // Clear the chunks array for the next request
      chunks.length = 0;
    }, 8000);
  });

 
  socket.on('error', (error) => {
    console.error('Socket Error:', error.message);
  });
}

const server = net.createServer((socket) => {
  console.log('Waiting for a client to connect');

  handleRequest(socket);
});

server.on('error', (error) => {
  console.error('Server Error:', error.message);
});

server.listen(1729, () => {
  console.log('Server listening on port 1729');
});
