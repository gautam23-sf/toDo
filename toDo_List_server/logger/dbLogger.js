class DbLogger {
    static instance;
    logs = [];

    constructor(){
        if(DbLogger.instance == null){
            this.logs = [];
            DbLogger.instance = this; 
        }
        return DbLogger.instance;
    }

    dbLogs(message){
        this.logs.push(message);
       return console.log(`message: ${message}`);
    }


    countDbLogs(){
        return console.log(`Total number of DB Logs : ${this.logs.length}`);
    }
    
}

module.exports = DbLogger;

// const logger = new DbLogger();
// logger.log('tetsss');
// console.log(logger.logs.length);
// const logger1 = new DbLogger();
// logger1.log('tssetsss');
// console.log(logger1.logs.length)
// const logger2 = new DbLogger();
// logger2.log('tetddsss');
// console.log(logger2.logs.length)