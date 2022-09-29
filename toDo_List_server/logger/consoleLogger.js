class ConsoleLogger {
    static instance;
    logs = [];

    constructor(){
        if(ConsoleLogger.instance == null){
            this.logs = [];
            ConsoleLogger.instance = this; 
        }
        return ConsoleLogger.instance;
    }

    consoleLogs(message){
        this.logs.push(message);
        return console.log(`message: ${message}`);
    }

    countConsoleLogs(){
        return console.log(`Total number of Console Logs : ${this.logs.length}`);
    }
}

module.exports = ConsoleLogger;


// const logger = new ConsoleLogger();
// logger.log('tetsss');
// console.log(logger.logs.length);
// const logger1 = new ConsoleLogger();
// logger1.log('tssetsss');
// console.log(logger1.logs.length)
// const logger2 = new ConsoleLogger();
// logger2.log('tetddsss');
// console.log(logger2.logs.length)