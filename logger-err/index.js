// const fs = require('node:fs');
const { open, close, appendFile, createWriteStream } = require('fs');

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
    setTimeout(() => {
        console.log('Operation Signal in process.... waiting for signals');
    }, 10000);
}

// handler for uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    // logger.error(`Uncaught Exception: ${err.message}`, { stack: err.stack });
    writeMessage(`Uncaught Exception: ${err.message}\nStack: ${err.stack}\n`);
    console.log(`Uncaught Exception: ${err.message}`, { stack: err.stack });
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    // logger.error(`Unhandled Rejection at: ${promise}`, { reason });
    // fs.writeFileSync('./error.log', `Unhandled Rejection at: ${promise}\nReason: ${reason}\n`, { flag: 'a' });
    writeMessage(`Unhandled Rejection at: ${promise}\nReason: ${reason}\n`);
    console.log(`Unhandled Rejection at: ${promise}`, { reason });
    process.exit(1);
});

// controlar señales del sistema
const signals = ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGQUIT', 'SIGUSR1', 'SIGUSR2'];

signals.forEach((signal) => {
    process.on(signal, () => {
        console.log(`Received ${signal}, exiting gracefully...`);
        process.exit(0);
    });
});



// Trigger an uncaught exception
// opeartionX(); 
// Trigger a Signal exit
operationSignal();