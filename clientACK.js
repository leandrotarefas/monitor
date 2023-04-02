const net = require('net');

const moment = require('moment');

function getDate() {
    return moment().format('YYYYMMDD');
}

function getMonthDay() {
    return moment().format('MMDD');
}

function getHourMinute() {
    return moment().format('HHmm');
}

function getMS() {
    return moment().format('SSS');
}

function getHourMinuteSSsss() {
    return moment().format('HHmmssSSS');
}

function getDateTimeGMT3() {
    const now = moment(); // Hora atual em UTC/GMT
    const gmt3 = now.utcOffset(0
    ); // Hora atual em GMT-3
    return gmt3.format('HHmmss');
}

function getRandomNumber(size) {
    const randomNumber = Math.floor(Math.random() * 1000); // Gera um número randômico inteiro entre 0 e 999
    return randomNumber.toString().padStart(size, '0'); // Formata o número com 3 caracteres preenchidos com zeros à esquerda se necessário
}

function padWithSpaces(str, size) {
    return str.padEnd(size, ' ');
}

// Recebe o número da porta e o host destino como argumentos de linha de comando
const [portDestino, hostDestino] = process.argv.slice(2);

// Cria o socket client
const client = new net.Socket();

// Conecta-se ao servidor
client.connect(portDestino, hostDestino, () => {
  console.log(`Conectado ao servidor ${hostDestino}:${portDestino}`);

  // Lê as mensagens digitadas pelo usuário no console e as envia para o servidor
  process.stdin.on('data', data => {
    const msg = `${'\u0000'}08001${getDate()}${getHourMinuteSSsss()}${getRandomNumber(3)}${padWithSpaces("", 35)}P1A^PIPR1${padWithSpaces("", 7)}S1A^PIPR10${padWithSpaces("", 38)}${'\u0000'}${'\u0000'}${getMonthDay()}${getDateTimeGMT3()}${padWithSpaces("", 3)}\n`
    const buffer = Buffer.from(msg, 'ascii');
    client.write(buffer);
  });
});

// Imprime o nome e o conteúdo do evento 'data' quando recebe dados do servidor
client.on('data', data => {
  console.log(`Dados recebidos do servidor: ${data}`);
});

// Imprime o nome do evento 'close' quando a conexão é fechada
client.on('close', () => {
  console.log('Conexão fechada');
});
 
