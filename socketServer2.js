const net = require('net');

const server = net.createServer((socket) => {
  console.log('Nova conexão recebida');

  socket.on('data', (data) => {
    console.log(`Dados recebidos: ${data}`);

    // Cria uma conexão TCP para enviar a mensagem para a porta 40818
    const tcpSocket = net.createConnection(40818, 'localhost');
    tcpSocket.on('connect', () => {
      console.log('Conexão estabelecida');
      tcpSocket.write(data);
    });
    tcpSocket.on('data', (data) => {
      console.log(`Resposta recebida: ${data}`);
      socket.write(data);
      tcpSocket.end();
    });
    tcpSocket.on('end', () => {
      console.log('Conexão finalizada');
    });
    tcpSocket.on('error', (err) => {
      console.log(`Erro: ${err}`);
    });
  });

  socket.on('close', () => {
    console.log('Conexão fechada');
  });

  socket.on('error', (err) => {
    console.log(`Erro: ${err}`);
  });
});

server.listen(40817, () => {
  console.log(`Servidor de redirecionamento escutando na porta 40817`);
});



/*********/

const io = require('socket.io')(40818);

io.on('connection', (socket) => {
  console.log(`Novo cliente conectado: ${socket.id}`);

  socket.on('mensagem', (msg) => {
    console.log(`Mensagem recebida: ${msg}`);
    io.emit('mensagem', msg);
  });
});



/**********/


const io = require('socket.io-client');
const socket = io('http://localhost:40818');

socket.on('connect', () => {
  console.log(`Conectado ao servidor Socket.io: ${socket.id}`);
  
  // Envia uma mensagem para o servidor
  socket.emit('mensagem', 'Olá, servidor Socket.io!');
});

// Recebe a mensagem do servidor e imprime no console
socket.on('mensagem', (msg) => {
  console.log(`Mensagem recebida: ${msg}`);
});

