const net = require('net');
const fs = require('fs');

const PORT = process.argv[2];

const server = net.createServer((socket) => {
  console.log(`New connection from ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', (data) => {
    const buffer = Buffer.from(data);
    const encoding = detectEncoding(buffer);
    const message = buffer.toString(encoding);
    console.log(`Received message from ${socket.remoteAddress}:${socket.remotePort}: ${message}`);

    const destHost = 'DESTINATION_HOST';
    const destPort = 'DESTINATION_PORT';
    const destSocket = net.createConnection({ host: destHost, port: destPort }, () => {
      console.log(`Connected to ${destHost}:${destPort}`);
      destSocket.write(data);
    });

    destSocket.on('data', (data) => {
      console.log(`Received response from ${destHost}:${destPort}: ${data.toString(encoding)}`);
      socket.write(data);
    });

    destSocket.on('end', () => {
      console.log(`Connection closed with ${destHost}:${destPort}`);
      socket.end();
    });

    destSocket.on('error', (err) => {
      console.error(`Error connecting to ${destHost}:${destPort}: ${err}`);
      socket.end();
    });
  });

  socket.on('end', () => {
    console.log(`Connection closed by ${socket.remoteAddress}:${socket.remotePort}`);
  });

  socket.on('error', (err) => {
    console.error(`Error with connection from ${socket.remoteAddress}:${socket.remotePort}: ${err}`);
  });
});

server.on('listening', () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('error', (err) => {
  console.error(`Error starting server on port ${PORT}: ${err}`);
});

server.listen(PORT);

function detectEncoding(buffer) {
  const encodings = ['utf8', 'ascii', 'utf16le', 'ucs2', 'base64', 'binary', 'hex'];
  for (let i = 0; i < encodings.length; i++) {
    try {
      buffer.toString(encodings[i]);
      return encodings[i];
    } catch (e) {
      continue;
    }
  }
  throw new Error('Unable to detect encoding');
}

process.on('SIGINT', () => {
  console.log('Server shutting down');
  server.close();
});
