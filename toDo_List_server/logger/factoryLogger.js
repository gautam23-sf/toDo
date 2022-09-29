const consoleLogger = require('./consoleLogger');
const dbLogger = require('./dbLogger');

class FactoryLogger {

    loggerSelection (type) {
        switch(type){
            case 'dbLog':
                return (new dbLogger());
            case 'consoleLog':
                return new consoleLogger();
        }
    }
}

module.exports = FactoryLogger;