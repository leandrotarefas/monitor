const net = require('net');
const fs = require('fs');

// Recebe o número da porta local, porta destino e host destino como argumentos de linha de comando
const [portaLocal, portaDestino, hostDestino, tag] = process.argv.slice(2);

// Cria o socket server
const server = net.createServer(socket => {
    console.log('Novo cliente conectado');

    // Cria a conexão com o host destino
    const remoteSocket = net.createConnection(portaDestino, hostDestino);

    // Imprime o nome e o conteúdo do evento 'data'
    socket.on('data', data => {       

        // Identifica o encode dos dados recebidos
        const encoding = detectEncoding(data);

        console.log(`${tag}: ${data.toString(encoding)}`);

        // Salva os dados em um arquivo de log
        saveToLog(data.toString(encoding), tag);

        // Envia os dados para o host destino
        remoteSocket.write(data);

    });

    // Imprime o nome do evento 'end'
    socket.on('end', () => {
        console.log('Cliente desconectado');

        // Encerra a conexão com o host destino
        remoteSocket.end();
    });

    // Imprime o nome e o conteúdo do evento 'data' recebido do host destino
    remoteSocket.on('data', data => {
        console.log(`Dados recebidos do host destino: ${data}`);

        // Envia os dados para o cliente
        socket.write(data);
    });

    // Imprime o nome do evento 'end' recebido do host destino
    remoteSocket.on('end', () => {
        console.log('Conexão com o host destino encerrada');

        // Encerra a conexão com o cliente
        socket.end();
    });
});

// Imprime o nome do evento 'listening' quando o servidor começa a escutar a porta local
server.on('listening', () => {
    console.log(`Socket server escutando na porta ${portaLocal}`);
});

// Imprime o nome do evento 'error' em caso de erro
server.on('error', err => {
    console.error(`Erro no socket server: ${err}`);
});

// Inicia o servidor na porta local especificada
server.listen(portaLocal);


// Função para identificar o encode dos dados recebidos
function detectEncoding(buffer) {
    const encodings = ['utf8', 'ascii', 'utf16le', 'ucs2', 'base64', 'latin1', 'binary', 'hex'];

    for (let i = 0; i < encodings.length; i++) {
        try {
            const str = buffer.toString(encodings[i]);
            if (str === buffer.toString()) {
                console.log(encodings[i])
                return encodings[i];
            }
        } catch (e) { }
    }

    return null;
}


// Função para salvar os dados em um arquivo de log
function saveToLog(data, tag) {
    fs.appendFileSync('log.txt', `${tag}: ${data}\n`, 'utf8', err => {
        if (err) {
            console.error(`Erro ao salvar dados em arquivo de log: ${err}`);
        }
    });
}
