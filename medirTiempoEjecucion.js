class Medir{
    startTimer() {
        this.start = new Date().getTime();
    };

    stopTimer() {
        return (new Date().getTime() - this.start);
    };
};

module.exports = Medir;