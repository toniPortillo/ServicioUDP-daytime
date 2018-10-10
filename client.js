let dgram = require('dgram');
let client = dgram.createSocket('udp4');
let Medir = require('./medirTiempoEjecucion.js');
let ControlMensaje =  require('./controlMensaje.js');

let medir = new Medir();
let controlmensaje = new ControlMensaje();

client.bind(8085);

process.stdin.setEncoding('utf-8');

process.stdin.on('data', (text) => {
    
    let message = "";
    let flag = 1;
    
    switch (text) {
        case "DAY\n":
            message = text;
            console.log("El usuario introdujo: " + message);     
            break;
        case "TIME\n":
            message = text;
            console.log("El usuario introdujo: " + message);
            break;
        case "DAYTIME\n":
            message = text;
            console.log("El usuario introdujo: " + message);
            break;
        default:
            flag = 0;
            console.log("Introduzca alguna de las tres opciones disponibles DAY/TIME/DAYTIME.");
    }       
    
    if(flag === 1) {
        message = new Buffer(message);
        client.send(message, 0, message.length, 8084, "localhost");
        medir.startTimer();
    }

});

client.on('error', (err) => {
    console.log('Error en el cliente' + err.stack);
    client.close();
});

let contador = 0;
let temporizador = 0;
client.on('message', (msg, rinfo) => {
    temporizador = medir.stopTimer();
    console.log('Test performance: ' + temporizador + 'ms');
    if(medir.stopTimer() === 5) {
        contador = contador + 1;
    }
    console.log('El cliente udp obtuvo: ' + msg + ' de:' + rinfo.address + ' : ' + rinfo.port);
});


client.on('listening', () => {
    let address = client.address();
    console.log('El cliente esta escuchando en: ' + address.address + ':' + address.port);
});