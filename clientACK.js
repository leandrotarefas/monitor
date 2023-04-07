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


const str = 'Olá, mundo!'; // String UTF-8
const buffer = Buffer.from(str, 'utf8'); // Cria um buffer a partir da string UTF-8
const utf8AsciiPairs = []; // Array para armazenar os pares UTF-8:ASCII

for (let i = 0; i < buffer.length; i++) {
  const utf8Code = buffer[i].toString(16).padStart(2, '0').toUpperCase(); // Converte cada elemento do buffer em um código UTF-8 em hexadecimal
  const asciiCode = buffer[i].charCodeAt().toString(); // Converte cada elemento do buffer em um código ASCII
  utf8AsciiPairs.push(`0x${utf8Code}:${asciiCode}`); // Adiciona o par UTF-8:ASCII ao array
}

const utf8AsciiString = utf8AsciiPairs.join(', '); // Cria a string de pares UTF-8:ASCII separada por vírgulas

console.log(utf8AsciiString); // Saída: "0x4F:79, 0x6C:108, 0xC3:195, 0xA1:161, 0x2C:44, 0x20:32, 0x6D:109, 0x75:117, 0x6E:110, 0x64:100, 0x6F:111, 0x21:33"





function customTextConversion(text) {
  return [...text].map(char => {
    if (/[0-9]/.test(char)) {
      return 'N';
    } else if (/[A-Za-z]/.test(char)) {
      return 'L';
    } else if (char === ' ') {
      return 'X';
    } else {
      return char.charCodeAt(0).toString(16);
    }
  }).join(' ');
}
 
