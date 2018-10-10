let dgram = require('dgram');
let server = dgram.createSocket('udp4');
let formateadorFecha = require('./formatearFecha.js');
let date = new Date();

console.log(formateadorFecha.formatFecha(date.getUTCDay(), date.getUTCDate(),
date.getUTCMonth(), date.getUTCFullYear()) + " ; " + date.getHours() + ":" + date.getMinutes() + 
":" + date.getSeconds());

server.on('error', (err) => {
    console.log('Error en el servidor' + err.stack);
    server.close();
});

server.on('message', function(msg, rinfo) {
    console.log('El servidor udp obtuvo: ' + msg + ' de:' + rinfo.address + ' : ' + rinfo.port);
    
    let bufferACadena = msg.toString('utf8');
    let message = "";
    
    switch(bufferACadena) {
        case 'DAY\n':
        message = formateadorFecha.formatFecha(date.getUTCDay(), date.getUTCDate(),
        date.getUTCMonth(), date.getUTCFullYear());
        
        message = new Buffer(message);
        server.send(message, 0, message.length, 8085, "127.0.0.1");
        break;
        
        case 'TIME\n':
        message = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(); 
        
        message = new Buffer(message); 
        server.send(message, 0, message.length, 8085, "127.0.0.1");
        break;
        
        case 'DAYTIME\n':
        message = formateadorFecha.formatFecha(date.getUTCDay(), date.getUTCDate(),
        date.getUTCMonth(), date.getUTCFullYear()) + " ; " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds();
        
        message = new Buffer(message);
        server.send(message, 0, message.length, 8085, "127.0.0.1");
        break;
    }
    
});

server.on('listening', () => {
    const address = server.address();
    console.log('El servidor esta escuchando en: ' + address.address + ':' + address.port);
});

server.bind(8084);