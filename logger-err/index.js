const { count } = require('console');
const { open, close, appendFile, createWriteStream } = require('fs');
const pino = require('pino');
const isProduction = process.env.NODE_ENV === 'production';
let globalCounter = 0;


const delopmentConfig = {
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            levelFirst: true,
        },
    },
};

const productionConfig = {
    level: 'info',
    transport: {
        target: 'pino/file',
        options: {
            destination: 'app.log',
            translateTime: 'yyyy-mm-dd HH:MM:ss Z',
            levelFirst: true,
        }
    },
};

const logger = pino(isProduction ? productionConfig : delopmentConfig);

function writeMessage(msg) {
    let stream = createWriteStream('./message.txt', { flags: 'a' });
    stream.write(msg + '\n');
}

// Example to trigger uncaughtException
function opeartionX() {
    throw new Error('Something went wrong in operationX!');
}

// Example to control the signals
function operationSignal(){
    let k = 0;
    setInterval(() => {
        // console.log('Operation Signal in process.... waiting for signals');
        // logger.debug({
        //     message: 'Operation Signal in process.... waiting for signals',
        //     contador: k++
        // });
        logger.info({
            message: 'Operation Signal in process.... waiting for signals',
            contador: k++
        });
        globalCounter = k;
    }, 1000);
}

// handler for uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    writeMessage(`Uncaught Exception: ${err.message}\nStack: ${err.stack}\n`);
    logger.error(`Uncaught Exception: ${err.message}\nStack: ${err.stack}\n`);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    // fs.writeFileSync('./error.log', `Unhandled Rejection at: ${promise}\nReason: ${reason}\n`, { flag: 'a' });
    writeMessage(`Unhandled Rejection at: ${promise}\nReason: ${reason}\n`);
    logger.error(`Unhandled Rejection at: ${promise}\nReason: ${reason}\n`);
    process.exit(1);
});

// controlar señales del sistema
const signals = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT', 'SIGUSR1', 'SIGUSR2'];

signals.forEach((signal) => {
    process.on(signal, () => {
        logger.info(`Received ${signal}, exiting gracefully at ${globalCounter}s...`);
        process.exit(0);
    });
});



// Trigger an uncaught exception
// opeartionX(); 
// Trigger a Signal exit
operationSignal();