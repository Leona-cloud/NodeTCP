const net = require('net');

const client = new net.Socket();

client.connect(1729, '127.0.0.1', () => {
  console.log('Connected to the server');
  client.write('Hello, Server!');
});

client.on('data', (data) => {
  console.log('Received response from the server:', data.toString());
});

client.on('end', () => {
    console.log('Connection with the server ended gracefully');
  });

client.on('error', (error) => {
  console.error('Client Error:', error.message);
});

process.on('SIGINT', () => {
    console.log('Received SIGINT. Ending the client connection gracefully.');
    client.end();
  });
