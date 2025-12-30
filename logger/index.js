const LoggerFactory = require("./factory");
const Logger = require(".");
const loggerInstance = new Logger();

const consoleLogger = LoggerFactory.createLogger("console");
const fileLogger = LoggerFactory.createLogger("file");

consoleLogger.log("Este es un mensaje para el logger de consola.");
fileLogger.log("Este es un mensaje para el logger de archivo. Append this");

loggerInstance.getLogs().forEach((log, i) => {
    console.log(`Log registrado ${i}: [${log.message}]`);
});