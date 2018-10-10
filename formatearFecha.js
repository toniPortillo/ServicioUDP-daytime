module.exports = {
    formatFecha: (diaDeSemana, dia, mes, ano)  => {
        let diasDeSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
        let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", 
        "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return diasDeSemana[diaDeSemana] + ", "+ dia + " de " + meses[mes] + " de " + ano;
    }
}    

