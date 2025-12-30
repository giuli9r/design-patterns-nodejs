const { open, close, appendFile, createWriteStream } = require('fs');

const Logger = require ('.');
const loggerInstance = new Logger();

class ConsoleLogger {
    constructor (){
        this.logger = loggerInstance;
    }   

    log(message) {
        console.log("Usando ConsoleLogger...");
        console.log(`ConsoleLogger class: ${message}`);
        this.logger.log(`ConsoleLogger: ${message}`);
    }
}

class FileLogger {
    constructor (){
        this.logger = loggerInstance;
    }   

    /** CREATING NEW FUNCTIONS - APPEND DATA TO A FILE */
    
    // option1 appendFile
    // not the best option: why?
    // open/close file each time we write - try/catch does nothing for async errors - not scalable 

    // closeFd(fd) {
    //     close(fd, (err) => {
    //         if (err) throw err;
    //     });
    // }
    // openFile($message) {
    //     open('message.txt', 'a', (err, fd) => {
    //         if (err) throw err;

    //         try {
    //             appendFile(fd, $message, 'utf8', (err) => {
    //                 this.closeFd(fd);
    //                 if (err) throw err;
    //             });
    //         } catch (err) {
    //             this.closeFd(fd);
    //             throw err;
    //         }
    //     }); 
    // }


    // option2 - stream
    // best option for appending data to a file. why?
    // File is opened once - Writes are buffered - event loop stays free
    writeMessage(msg) {
        let stream = createWriteStream('message.txt', { flags: 'a' });
        stream.write(msg + '\n');
    }
    /** END creating new things */

    log(message) {
        console.log("Usando FileLogger...");
        console.log(`File Logger class: ${message}`);
        // this.openFile(message);  // op1
        this.writeMessage(message); // op2
        this.logger.log(`FileLogger: ${message}`);
    }
}

class LoggerFactory {

    static createLogger (type) {
        switch (type) {
            case "console":
                return new ConsoleLogger();
                break;
            case "file":
                return new FileLogger();
                break;
        
            default:
                console.log("Tipo de logger no soportado, se usará ConsoleLogger por defecto.");
                return new ConsoleLogger();
                break;
        }
    }
}

module.exports = LoggerFactory;