class ControlMensaje {
    constructor(temporizador, mensaje) {
        this.temporizador = temporizador;
        this.mensaje = mensaje;
    };

    getMensaje() {
        return this.mensaje;
    };

    getTemporizador() {
        return this.temporizador;
    };

    setMensaje(mensaje) {
        this.mensaje = mensaje;
    };
    
    setTemporizador(temporizador) {
        this.temporizador = temporizador;
    };
};

module.exports = ControlMensaje;